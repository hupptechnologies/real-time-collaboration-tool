import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
	Box,
	Drawer,
	List,
	Toolbar,
	IconButton,
	Tooltip,
	Typography,
	ListItemButton
} from '@mui/material';
import {
	Add,
	ChevronLeft,
	ChevronRight,
	CreateNewFolderOutlined,
	DeleteForeverOutlined,
	EditOutlined,
	FolderCopyOutlined,
	KeyboardArrowDown,
	KeyboardArrowRight,
	PostAddOutlined,
	FolderOutlined,
	SpaceDashboardOutlined
} from '@mui/icons-material';
import ConfirmModal from '@/components/ConfirmModal';
import FolderListItem from '@/components/home/FolderListItem';
import NewContextMenu from '@/components/home/NewContextMenu';
import PageListItem from '@/components/home/PageListItem';
import { useToaster } from '@/context/ToasterContext';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchSingleSpaceAction } from '@/redux/space';
import { createFolderAction, deleteFolderAction, updateFolderAction } from '@/redux/folder';
import { createPageAction, deletePageAction, updatePageAction } from '@/redux/page';
import {
	AddIconButton,
	AddIconContentBox,
	ArrowIconStyle,
	ContentButton,
	ContentIconBox,
	ContentIconInlineBox,
	createBtn,
	DrawerMenuStyle,
	SpaceNameBox,
	EmptyStateContainer,
	EmptyStateIcon,
	EmptyStateTitle,
	EmptyStateDescription
} from '@/styles';
import {
	THandleContextMenuFn,
	IAPIResponse,
	IContextMenu,
	IFolder,
	IPage,
	IPageCreationAttribute,
	IContextMenuElement
} from '@/types';
import {
	generateDefaultFolderName,
	restructureFolders,
	findPagePathInTree,
	getParentPagePath
} from '@/utils/common';

interface UIState {
	open: boolean;
	openContent: boolean;
	isHovered: boolean;
	editingFolderId: number | null;
	editingPageId: number | null;
	isDeleted: boolean;
	deleteItem: IFolder | IPage | null;
	contextMenu: IContextMenu | undefined;
}

const DrawerMenu = () => {
	const params = useParams();
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const { showToaster } = useToaster();
	const { space } = useAppSelector((state: RootState) => state.space);
	const spaceId = params?.spaceId as string;
	const pageId = searchParams?.get('pageId');
	const pageIdNumber = pageId ? Number(pageId) : null;

	const [uiState, setUiState] = useState<UIState>({
		open: true,
		openContent: true,
		isHovered: false,
		editingFolderId: null,
		editingPageId: null,
		isDeleted: false,
		deleteItem: null,
		contextMenu: undefined
	});
	const [folderData, setFolderData] = useState<IFolder[]>([]);
	const [rootPages, setRootPages] = useState<IPage[]>([]);
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
	const [openPages, setOpenPages] = useState<Record<string, boolean>>({});

	const memoizedFolderData = useMemo(() => {
		if (Array.isArray(space?.folders) && space?.folders.length > 0) {
			return restructureFolders(space.folders, space.pages || []);
		}
		return { folders: [], rootPages: [] };
	}, [space?.folders]);

	useEffect(() => {
		if (memoizedFolderData) {
			setFolderData(memoizedFolderData.folders);
			setRootPages(memoizedFolderData.rootPages);

			// Auto-expand folders and pages if pageId is present
			if (pageIdNumber) {
				const { folderPath, foundPage } = findPagePathInTree(
					memoizedFolderData.folders,
					memoizedFolderData.rootPages,
					pageIdNumber || 0
				);

				if (folderPath.length > 0) {
					setOpenFolders((prev) => {
						const newOpen = { ...prev };
						folderPath.forEach((fid) => {
							newOpen[fid] = true;
						});
						return newOpen;
					});
					setUiState((prev) => ({ ...prev, open: true }));
				}

				if (foundPage) {
					const parentPagePath = getParentPagePath(
						foundPage,
						[],
						memoizedFolderData.folders,
						memoizedFolderData.rootPages
					);
					if (parentPagePath.length > 0) {
						setOpenPages((prev) => {
							const newOpen = { ...prev };
							parentPagePath.forEach((pid) => {
								newOpen[pid] = true;
							});
							return newOpen;
						});
					}
				}
			}
		}
	}, [memoizedFolderData]);

	const getAllFolder = useCallback((): void => {
		dispatch(fetchSingleSpaceAction({ data: { id: Number(spaceId) } }));
	}, [spaceId]);

	useEffect(() => {
		if (spaceId) {
			getAllFolder();
		}
	}, [spaceId, getAllFolder]);

	const toggleDrawer = useCallback((): void => {
		setUiState((prev) => ({ ...prev, open: !prev.open }));
	}, []);

	const toggleMainDocument = useCallback((): void => {
		router.push(`/home/${spaceId}`);
	}, [router, spaceId]);

	const toggleFolder = useCallback((folder: IFolder): void => {
		setOpenFolders((prev) => ({ ...prev, [folder.id]: !prev[folder.id] }));
	}, []);

	const openPage = useCallback(
		(page: IPage): void => {
			router.push(`/home/${spaceId}?pageId=${page.id}&edit=${page.status === 'draft'}`);
		},
		[router, spaceId]
	);

	const handleCloseContextMenu = useCallback((): void => {
		setUiState((prev) => ({ ...prev, contextMenu: undefined }));
	}, []);

	const handleContextMenu: THandleContextMenuFn = useCallback((e, item, type): void => {
		const rect = e.currentTarget.getBoundingClientRect();
		setUiState((prev) => ({
			...prev,
			contextMenu: {
				mouseX: rect.left,
				mouseY: rect.bottom + 10,
				type: type,
				target: (item as IPage)?.status ? 'page' : 'folder',
				item
			}
		}));
	}, []);

	const handleNewPage = (): void => {
		const newPage: IPageCreationAttribute = {
			title: '',
			content: '',
			status: 'draft',
			spaceId: Number(spaceId)
		};
		if (uiState.contextMenu?.target === 'folder') {
			if (uiState.contextMenu?.item) {
				newPage.folderId = uiState.contextMenu?.item?.id;
				newPage.parentId = null;
			} else {
				newPage.parentId = null;
				newPage.folderId = null;
			}
		} else {
			newPage.parentId = uiState.contextMenu?.item?.id;
			newPage.folderId = null;
		}
		dispatch(createPageAction({ data: newPage, callback: handleCallBack }));
	};

	const handleNewFolder = (): void => {
		const newName = generateDefaultFolderName(space.folders || []);
		dispatch(
			createFolderAction({
				data: {
					name: newName,
					parentFolderId: uiState.contextMenu?.item?.id || null,
					spaceId: Number(spaceId),
					description: ''
				},
				callback: handleCallBack
			})
		);
	};

	const handleCallBack = (data: IAPIResponse<IFolder | IPage>) => {
		if (data.success) {
			getAllFolder();
			if (uiState.contextMenu?.item) {
				setOpenFolders((prev) => ({ ...prev, [Number(uiState.contextMenu?.item?.id)]: true }));
			} else {
				setUiState((prev) => ({ ...prev, openContent: true }));
			}
			setUiState((prev) => ({
				...prev,
				editingFolderId: data.data?.id || null,
				contextMenu: undefined
			}));
			showToaster(data.message || 'Created', 'success');
			const isPage = (item: any): item is IPage => {
				return item && 'title' in item && 'content' in item;
			};
			if (data.data && isPage(data.data)) {
				openPage(data.data);
			}
		}
	};

	const handleRename = (item: IFolder | IPage, name: string, type: 'folder' | 'page') => {
		if (name.trim() === '') {
			showToaster('Name cannot be empty', 'error');
			return;
		}

		const originalName = type === 'folder' ? (item as IFolder).name : (item as IPage).title;
		if (name.trim() === originalName) {
			setUiState((prev) => ({
				...prev,
				editingFolderId: type === 'folder' ? null : prev.editingFolderId,
				editingPageId: type === 'page' ? null : prev.editingPageId
			}));
			return;
		}

		if (type === 'folder') {
			dispatch(
				updateFolderAction({
					data: { id: item.id, name: name },
					callback: renameCallBack
				})
			);
		} else {
			dispatch(
				updatePageAction({
					data: { id: item.id, title: name },
					callback: renameCallBack
				})
			);
		}
	};

	const renameCallBack = (data: IAPIResponse<IFolder | IPage>) => {
		if (data.success) {
			getAllFolder();
			setUiState((prev) => ({
				...prev,
				editingFolderId: null,
				editingPageId: null,
				contextMenu: undefined,
				isDeleted: false
			}));
			showToaster(data.message || 'Updated', 'success');
		}
	};

	const handleEditItem = () => {
		setUiState((prev) => {
			const { contextMenu } = prev;
			const itemId = contextMenu?.item?.id || null;
			const isPage = contextMenu?.target === 'page';
			return {
				...prev,
				[isPage ? 'editingPageId' : 'editingFolderId']: itemId,
				contextMenu: undefined
			};
		});
	};

	const handleDeleteItem = () => {
		setUiState((prev) => ({
			...prev,
			isDeleted: true,
			deleteItem: uiState.contextMenu?.item as IFolder | IPage | null,
			contextMenu: undefined
		}));
	};

	const handleConfirm = (confirmed: boolean) => {
		if (confirmed && uiState.deleteItem?.id) {
			if ('title' in uiState.deleteItem) {
				dispatch(
					deletePageAction({
						data: { id: uiState.deleteItem.id },
						callback: handleDeleteCallback
					})
				);
			} else {
				dispatch(
					deleteFolderAction({
						data: { id: uiState.deleteItem.id },
						callback: handleDeleteCallback
					})
				);
			}
		} else {
			setUiState((prev) => ({ ...prev, isDeleted: false, deleteItem: null }));
		}
	};

	const handleDeleteCallback = (data: IAPIResponse<IFolder | IPage>) => {
		if (data.success) {
			getAllFolder();
			setUiState((prev) => ({ ...prev, isDeleted: false, deleteItem: null }));
			showToaster(data.message || 'Deleted', 'success');
		}
	};

	const menuItems = useMemo(() => {
		if (uiState.contextMenu?.type === 'new') {
			const items: IContextMenuElement[] = [
				{
					label: 'Page',
					icon: <PostAddOutlined fontSize="small" />,
					handleOnclick: handleNewPage
				}
			];

			if (uiState.contextMenu?.target === 'folder') {
				items.push(
					{ divider: true },
					{
						label: 'Folder',
						icon: <CreateNewFolderOutlined fontSize="small" />,
						handleOnclick: handleNewFolder
					}
				);
			}
			return items;
		} else if (uiState.contextMenu?.type === 'more') {
			return [
				{
					label: 'Rename',
					icon: <EditOutlined fontSize="small" />,
					handleOnclick: handleEditItem
				},
				{ divider: true },
				{
					label: 'Delete',
					icon: <DeleteForeverOutlined fontSize="small" />,
					handleOnclick: handleDeleteItem
				}
			] as IContextMenuElement[];
		}
		return [];
	}, [uiState.contextMenu]);

	return (
		<Box sx={{ display: 'flex' }}>
			<IconButton
				onClick={toggleDrawer}
				aria-label="open drawer"
				edge="end"
				sx={ArrowIconStyle(uiState.open)}>
				{uiState.open ? (
					<Tooltip title="Collapse">
						<ChevronLeft />
					</Tooltip>
				) : (
					<Tooltip title="Expand">
						<ChevronRight />
					</Tooltip>
				)}
			</IconButton>
			<Drawer variant="permanent" open={uiState.open} sx={DrawerMenuStyle(uiState.open)}>
				{uiState.open && (
					<>
						<Toolbar />
						<Box onClick={toggleMainDocument} sx={SpaceNameBox}>
							<SpaceDashboardOutlined fontSize="medium" />
							<Typography variant="h6" fontWeight="bold">
								{space.name}
							</Typography>
						</Box>
						<Box sx={{ display: 'grid', gridColumn: 1, gridRow: 1 }}>
							<ListItemButton
								sx={ContentButton}
								onClick={() => setUiState((prev) => ({ ...prev, openContent: !prev.openContent }))}
								onMouseEnter={() => setUiState((prev) => ({ ...prev, isHovered: true }))}
								onMouseLeave={() => setUiState((prev) => ({ ...prev, isHovered: false }))}>
								<Box sx={ContentIconBox}>
									<Box sx={ContentIconInlineBox}>
										{uiState.isHovered ? (
											uiState.openContent ? (
												<KeyboardArrowDown />
											) : (
												<KeyboardArrowRight />
											)
										) : (
											<FolderCopyOutlined />
										)}
									</Box>
								</Box>
								<Typography sx={{ marginLeft: '8px' }}>Content</Typography>
							</ListItemButton>
							<Box sx={AddIconContentBox}>
								<Tooltip title="create" placement="top">
									<ListItemButton
										sx={AddIconButton}
										data-type="new"
										data-active={uiState.contextMenu?.type === 'new' && !uiState.contextMenu?.item}
										onClick={(e) => handleContextMenu(e, null, 'new')}>
										<Add />
									</ListItemButton>
								</Tooltip>
							</Box>
						</Box>
						{uiState.openContent && (
							<>
								{rootPages && rootPages.length > 0 ? (
									<List sx={{ padding: 0 }}>
										{rootPages.map((page) => (
											<PageListItem
												key={page.id}
												page={page}
												level={0}
												menuItem={uiState.contextMenu?.item as IPage}
												handleContextMenu={handleContextMenu}
												editingPageId={uiState.editingPageId}
												handleRename={handleRename}
												openPages={openPages}
												selectedPageId={pageIdNumber}
											/>
										))}
									</List>
								) : null}
								{folderData?.length > 0 ? (
									<List sx={{ padding: 0 }}>
										{folderData.map((folder) => (
											<FolderListItem
												key={folder.id}
												folder={folder}
												editingFolderId={uiState.editingFolderId}
												menuItem={uiState.contextMenu?.item}
												openFolder={openFolders}
												toggleFolder={toggleFolder}
												handleContextMenu={handleContextMenu}
												handleRename={handleRename}
												editingPageId={uiState.editingPageId}
												openPages={openPages}
												selectedPageId={pageIdNumber}
											/>
										))}
										<ListItemButton
											key={'button'}
											onClick={(e) => handleContextMenu(e, null, 'new')}
											sx={createBtn}>
											<Add /> Create
										</ListItemButton>
									</List>
								) : (
									<Box sx={EmptyStateContainer}>
										<Box sx={EmptyStateIcon}>
											<FolderOutlined />
										</Box>
										<Typography variant="h6" sx={EmptyStateTitle}>
											No pages or folders
										</Typography>
										<Typography variant="body2" sx={EmptyStateDescription}>
											Create a page or folder to start organizing your space
										</Typography>
									</Box>
								)}
							</>
						)}
					</>
				)}
			</Drawer>
			<ConfirmModal
				open={uiState.isDeleted}
				title={`Are you sure you want to delete ${uiState.deleteItem && ('name' in uiState.deleteItem ? uiState.deleteItem.name : (uiState.deleteItem as IPage).title)} ?`}
				subTitle="This action will delete the item and its related data. Are you sure?"
				onClose={handleConfirm}
			/>
			<NewContextMenu
				open={Boolean(uiState.contextMenu)}
				handleOnclose={handleCloseContextMenu}
				position={
					uiState.contextMenu
						? { mouseX: uiState.contextMenu.mouseX, mouseY: uiState.contextMenu.mouseY }
						: null
				}
				menuItems={menuItems}
			/>
		</Box>
	);
};

export default React.memo(DrawerMenu);
