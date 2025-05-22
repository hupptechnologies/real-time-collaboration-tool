import {
	MenuButtonBold,
	MenuButtonBulletedList,
	MenuButtonEditLink,
	MenuButtonHighlightColor,
	MenuButtonIndent,
	MenuButtonItalic,
	MenuButtonOrderedList,
	MenuButtonRedo,
	MenuButtonStrikethrough,
	MenuButtonTextColor,
	MenuButtonUnderline,
	MenuButtonUndo,
	MenuControlsContainer,
	MenuDivider,
	MenuSelectHeading,
	MenuSelectTextAlign
} from 'mui-tiptap';

const MenuHighlightSwatchColor = [
	{ value: '#CFE1FD', label: 'Blue Tint' },
	{ value: '#C6EDFB', label: 'Sky Tint' },
	{ value: '#BAF3DB', label: 'Mint Tint' },
	{ value: '#F5E989', label: 'Yellow Tint' },
	{ value: '#FFD5D2', label: 'Coral Tint' },
	{ value: '#EED7FC', label: 'Lavender Tint' }
];
const MenuTextSwatchColors = [
	{ value: '#292A2E', label: 'Charcoal' },
	{ value: '#1558BC', label: 'Blue 1' },
	{ value: '#206A83', label: 'Teal 1' },
	{ value: '#216E4E', label: 'Green 1' },
	{ value: '#E06C00', label: 'Orange 1' },
	{ value: '#AE2E24', label: 'Red 1' },
	{ value: '#803FA5', label: 'Purple 1' },
	{ value: '#7D818E', label: 'Grey 1' },
	{ value: '#357DE8', label: 'Blue 2' },
	{ value: '#2898BD', label: 'Teal 2' },
	{ value: '#22A06B', label: 'Green 2' },
	{ value: '#FCA700', label: 'Orange 2' },
	{ value: '#C9372C', label: 'Red 2' },
	{ value: '#AF59E1', label: 'Purple 2' },
	{ value: '#FFFFFF', label: 'White' },
	...MenuHighlightSwatchColor
];

const EditorMenuControls = () => {
	return (
		<MenuControlsContainer>
			<MenuButtonUndo />
			<MenuButtonRedo />
			<MenuDivider />

			<MenuSelectHeading labels={{ paragraph: 'Normal text' }} />
			<MenuDivider />

			<MenuButtonBold />
			<MenuButtonItalic />
			<MenuButtonUnderline />
			<MenuButtonStrikethrough />
			<MenuDivider />

			<MenuSelectTextAlign />
			<MenuDivider />

			<MenuButtonTextColor defaultTextColor={'#000000'} swatchColors={MenuTextSwatchColors} />
			<MenuButtonHighlightColor swatchColors={MenuHighlightSwatchColor} />
			<MenuDivider />

			<MenuButtonOrderedList />
			<MenuButtonBulletedList />
			<MenuButtonIndent />
			<MenuDivider />

			<MenuButtonEditLink />
		</MenuControlsContainer>
	);
};

export default EditorMenuControls;
