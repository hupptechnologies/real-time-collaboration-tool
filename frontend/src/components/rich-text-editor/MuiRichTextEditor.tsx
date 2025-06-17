import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
	LinkBubbleMenu,
	RichTextEditor,
	RichTextReadOnly,
	TableBubbleMenu,
	type RichTextEditorRef
} from 'mui-tiptap';
import { Button, Container, Box, Fade, Typography, TextField } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import EditorMenuControls from './EditorMenuControls';
import useExtensions from './useExtensions';
import { useToaster } from '@/context/ToasterContext';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getPageAction, updatePageAction } from '@/redux/page';
import { fetchSingleSpaceAction, updateSpaceAction } from '@/redux/space';
import { IAPIResponse, IPage, TPageStatus, ISpace } from '@/types';
import { EditorContainerBox, EditorWrapperBox, ButtonBox, RichEditorBox } from '@/styles/editor';

const MuiRichTextEditor = () => {
	const rteRef = useRef<RichTextEditorRef>(null);
	const searchParams = useSearchParams();
	const router = useRouter();
	const { space } = useAppSelector((state: RootState) => state.space);
	const { page } = useAppSelector((state: RootState) => state.page);
	const dispatch = useAppDispatch();
	const { showToaster } = useToaster();
	const pageId = searchParams.get('pageId');
	const edit = searchParams.get('edit');

	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const extensions = useExtensions({
		placeholder: 'Add your own content here...'
	});

	const getPageData = useCallback(() => {
		if (pageId) {
			dispatch(getPageAction({ data: { id: Number(pageId) } }));
		}
	}, [pageId, dispatch]);

	useEffect(() => {
		getPageData();
	}, [getPageData]);

	useEffect(() => {
		setIsEditable(edit === 'true');
	}, [edit]);

	useEffect(() => {
		if (pageId && page) {
			setTitle(page.title || '');
			setContent(page.content || '');
		} else if (space) {
			setTitle(space.name || '');
			setContent(space.description || '');
		}
	}, [pageId, page, space]);

	useEffect(() => {
		if (rteRef.current && isEditable) {
			rteRef.current.editor?.commands.setContent(content);
		}
	}, [content, isEditable]);

	const handleUpdatePage = (status: TPageStatus) => {
		if (title.trim() === '' && status === 'published') {
			showToaster('Title is required', 'error');
			return;
		}
		setIsUpdating(true);
		try {
			const currentContent = rteRef.current?.editor?.getHTML() || content;
			if (pageId) {
				dispatch(
					updatePageAction({
						data: {
							id: Number(pageId),
							title,
							content: currentContent,
							status: status
						},
						callback: handleCallBack
					})
				).unwrap();
			} else if (space?.id) {
				dispatch(
					updateSpaceAction({
						data: {
							id: Number(space.id),
							name: title,
							description: currentContent
						},
						callback: handleSpaceCallBack
					})
				).unwrap();
			}
		} catch (error: any) {
			showToaster(`Failed to update ${error.message}`, 'error');
		} finally {
			setIsUpdating(false);
		}
	};

	const handleCallBack = (res: IAPIResponse<IPage>) => {
		if (res.success) {
			setIsEditable(false);
			getPageData();
			dispatch(fetchSingleSpaceAction({ data: { id: Number(space?.id) } }));
			router.replace(`/home/${space?.id}?pageId=${pageId}&edit=false`);
			if (res.data?.status === 'draft') {
				showToaster('Draft updated successfully', 'success');
			} else {
				showToaster('Page updated successfully', 'success');
			}
		}
	};

	const handleSpaceCallBack = (res: IAPIResponse<ISpace>) => {
		if (res.success) {
			setIsEditable(false);
			dispatch(fetchSingleSpaceAction({ data: { id: Number(space?.id) } }));
			router.replace(`/home/${space?.id}`);
			showToaster('Space updated successfully', 'success');
		}
	};

	return (
		<Container sx={EditorContainerBox} maxWidth="lg">
			<Box sx={EditorWrapperBox}>
				<Box sx={ButtonBox}>
					{isEditable ? (
						page?.status === 'draft' ? (
							<>
								<Button
									variant="contained"
									sx={{ mr: 1 }}
									onClick={() => handleUpdatePage('published')}
									disabled={isUpdating}>
									{isUpdating ? 'Publishing...' : 'Publish'}
								</Button>
								<Button
									variant="outlined"
									onClick={() => handleUpdatePage('draft')}
									disabled={isUpdating}>
									Close Draft
								</Button>
							</>
						) : (
							<>
								<Button
									variant="contained"
									sx={{ mr: 1 }}
									onClick={() => handleUpdatePage('published')}
									disabled={isUpdating}>
									{isUpdating ? 'Updating...' : 'Update'}
								</Button>
								<Button variant="text" onClick={() => setIsEditable(false)} disabled={isUpdating}>
									Close
								</Button>
							</>
						)
					) : (
						<Button
							variant="outlined"
							startIcon={<EditOutlined />}
							onClick={() => setIsEditable(true)}>
							Edit
						</Button>
					)}
				</Box>
				<Fade in={true} timeout={300}>
					<Box>
						{isEditable ? (
							<TextField
								id="title"
								name="title"
								placeholder="Add Your Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								fullWidth
								variant="outlined"
								size="small"
								sx={{ mb: 2 }}
							/>
						) : (
							<Typography variant="h6" sx={{ mb: 2 }}>
								{title}
							</Typography>
						)}
					</Box>
				</Fade>
				<Box sx={RichEditorBox}>
					<Fade in={true} timeout={300}>
						<Box>
							{isEditable ? (
								<RichTextEditor
									ref={rteRef}
									editable={true}
									extensions={extensions}
									immediatelyRender={false}
									content={content}
									renderControls={() => <EditorMenuControls />}>
									{() => (
										<>
											<LinkBubbleMenu />
											<TableBubbleMenu />
										</>
									)}
								</RichTextEditor>
							) : (
								<RichTextReadOnly
									content={content || 'Add your own content here...'}
									extensions={extensions}
								/>
							)}
						</Box>
					</Fade>
				</Box>
			</Box>
		</Container>
	);
};

export default MuiRichTextEditor;
