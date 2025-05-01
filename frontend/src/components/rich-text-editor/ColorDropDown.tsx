import React, { useState, useRef } from 'react';
import { Box, IconButton, Popper, ClickAwayListener, Paper } from '@mui/material';
import { CheckOutlined, FormatColorTextOutlined } from '@mui/icons-material';
import { ColorDropDownBox, ColorDropDownPaper } from '@/styles';

const COLORS = [
	'#292A2E',
	'#1558BC',
	'#206A83',
	'#216E4E',
	'#E06C00',
	'#AE2E24',
	'#803FA5',
	'#7D818E',
	'#357DE8',
	'#2898BD',
	'#22A06B',
	'#FCA700',
	'#C9372C',
	'#AF59E1',
	'#FFFFFF',
	'#CFE1FD',
	'#C6EDFB',
	'#BAF3DB',
	'#F5E989',
	'#FFD5D2',
	'#EED7FC'
];

const ColorDropdown = ({ onSelect }: { onSelect: (_color: string) => void }) => {
	const [open, setOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState<string>('#292A2E');
	const anchorRef = useRef(null);

	const handleSelect = (color: string) => {
		setSelectedColor(color);
		onSelect(color);
		setOpen(false);
	};

	return (
		<>
			<IconButton ref={anchorRef} onClick={() => setOpen(!open)} size="small">
				<FormatColorTextOutlined sx={{ color: selectedColor }} />
			</IconButton>
			<Popper open={open} anchorEl={anchorRef.current} placement="bottom-start">
				<ClickAwayListener onClickAway={() => setOpen(false)}>
					<Paper sx={ColorDropDownPaper}>
						{COLORS.map((color) => (
							<Box key={color} onClick={() => handleSelect(color)} sx={ColorDropDownBox({ color })}>
								{selectedColor === color && (
									<CheckOutlined
										sx={{ fontSize: 16, color: color === '#FFFFFF' ? '#000' : '#fff' }}
									/>
								)}
							</Box>
						))}
					</Paper>
				</ClickAwayListener>
			</Popper>
		</>
	);
};

export default ColorDropdown;
