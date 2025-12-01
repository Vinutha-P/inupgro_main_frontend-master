'use client'
import React, { useEffect, useState } from "react";
import DetailTiles from "../atom/DetailTiles";

interface TileDetail {
	tileDetail: string;
	tileHeading: string;
}

interface KeystaticsProps {
	heading: string;
	tiles: TileDetail[];
}

const KeyStatics: React.FC<KeystaticsProps> = ({ heading, tiles }) => {
	const [isLoadings, setIsLoadings] = useState(true);

		useEffect(() => {
			setTimeout(() => {
				setIsLoadings(false);
			}, 1000);
		}, []);
	return (
		<div className={`w-full h-fit p-3 md:p-5 flex flex-col gap-3 md:gap-5 rounded-lg ${isLoadings ? "sekleton-light-gray" : "bg-white "}`}>
			{ isLoadings ? (<h4 className="skeleton-medium-gray h-7 w-[25%] rounded-lg "></h4>) : (
			// <h4 className=6text-xl md:text-[1.75rem] font-semibold text-darkBlue">
			<h6 className=" text-darkBlue">
				{heading}
			</h6>
		)
			}
			<div className="w-full flex flex-col md:flex-row gap-3 md:gap-4">
				{tiles?.map((tile, index) => (
					<div className="md:flex-1" key={`${tile.tileHeading}-${index}`} >
					<DetailTiles
						// key={index}
						tileDetail={tile?.tileDetail}
						tileHeading={tile?.tileHeading}
					/>
					</div>
				))}
			</div>
		</div>
	);
};

export default KeyStatics;
