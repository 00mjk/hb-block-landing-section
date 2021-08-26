/**
 * Import local Styles.
 */
import './style.scss';
import './editor.scss';

/**
 * Import local Icons.
 */
import { 
	IconSettingsCSSGridTracksLR,
	IconSettingsAspectRatioSquare,
	IconSettingsAspectRatioWide,
	IconSettingsAspectRatioUltrawide,
	IconSettingsCSSGridTrackL,
	IconSettingsCSSGridTrackR
} from '../svg/icons.js';

/**
 * Import WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { help } from '@wordpress/icons';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { Button, SelectControl, PanelBody, PanelRow } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Register the block "hb/landing-section".
 */
registerBlockType( 'hb/landing-section', {

	// Handle the editor block rendering
	edit: ( { attributes, setAttributes, isSelected } ) => {

		// Add custom classname to json properties
        const blockProps = useBlockProps( {
            className: 'hb__landingSection',
        } );

		const gridPosStyle = {
			gridColumnStart: attributes.gridColumnStart,
			gridColumnEnd: attributes.gridColumnEnd,
			minHeight: attributes.minHeight
		};
/*
		if ( attributes.gridColumnStart === attributes.gridColumnEnd ) {
			let newGridColumnAll = attributes.gridColumnStart.split('-')[0];
			setAttributes( { gridColumnAll: newGridColumnAll } );
		} else {
			setAttributes( { gridColumnAll: 'disabled' } );
		}

		// Define select values
		const [ gridColumnAll, setGridColumnAll ] = useState( 'attributes.gridColumnAll' );
*/

		// Define select values
		const [ gridColumnStart, setGridColumnStart ] = useState( 'attributes.gridColumnStart' );
		// Define select values
		const [ gridColumnEnd, setGridColumnEnd ] = useState( 'attributes.gridColumnEnd' );
/*
		// Handle setting vars on user option selection
		const updateGridColumnAll = ( newValue ) => {
			setAttributes( { gridColumnStart: newValue + '-l' } );
			setAttributes( { gridColumnEnd: newValue + '-r' } );
			useState( 'attributes.gridColumnStart' );
			useState( 'attributes.gridColumnEnd' );
		};
*/
		const updateGridColumnStart = ( newValue ) => {
			setAttributes( { 
				gridColumnStart: newValue + '-l'
			} );
			useState( 'attributes.gridColumnStart' );
		};
		const updateGridColumnEnd = ( newValue ) => {
			setAttributes( { 
				gridColumnEnd: newValue + '-r'
			} );
			useState( 'attributes.gridColumnEnd' );
		};

		const gridOptions = [
			{ label: '1:1 Square', value: 'oneone' },
			{ label: '3:2 Wide', value: 'threetwo' },
			{ label: '16:9 Cinema', value: 'sixteennine' },
			{ label: 'Full Width', value: 'full' },
			{ label: 'Custom', value: 'disabled' },
		];
/*

https://stackoverflow.com/questions/55655594/saving-selectcontrol-option
		const SelectControlState = useState( {
			gridColumnAll: 'oneone',
		} )( ( { gridColumnAll, setState } ) => (
			<SelectControl
				label="Test"
				value={ gridColumnAll }
				options={ gridOptions }
				onChange={ ( gridColumnAll ) => { setState( { gridColumnAll } ) } }
			/>
		) );
*/
		// Build the editor css grid visual aid
		const BorderDivs = () => {
			const numbers = [1, 2, 3, 4, 5, 6, 7];
			const divs = numbers.map((number) =>
				<div style={{ gridColumn:number + '/ span 1' }}
					 className='hb__outline'
					 key={number.toString()}
				>
				</div>
			);
			return (
				<>{divs}</>
			);
		}

		/* Build JSX block for the editor */
		return (
			<>

				<section { ...blockProps }>

					{ isSelected && (
						<BorderDivs />
					) }
					<div className="hb__landingSection_content" style={gridPosStyle}>
						<p>gridColumnStart is { attributes.gridColumnStart }.</p>
						<p>gridColumnEnd is { attributes.gridColumnEnd }.</p>
						<InnerBlocks />
					</div>
					<div className="hb__landingSection_backdrop">
						<InnerBlocks />
					</div>

				</section>

				<InspectorControls>
					<PanelBody
						title={__('Width and Position')}
						initialOpen={true}
					>
						<PanelRow>
							<IconSettingsCSSGridTracksLR />

						</PanelRow>
						<PanelRow>
							<SelectControl
								label="Left"
								labelPosition="left"
								title="Left Edge"
								value={ gridColumnStart }
								options={ gridOptions }
								onChange={ updateGridColumnStart }
							/>
							<SelectControl
								label="Right"
								labelPosition="left"
								title="Right Edge"
								value={ gridColumnEnd }
								options={ gridOptions }
								onChange={ updateGridColumnEnd }
							/>
						</PanelRow>
						<PanelRow>
							<Button 
								icon={ help }
								label="Help"
								className="hb__inspectorHelpButton"
							>
								Help
							</Button>
						</PanelRow>
				    </PanelBody>
				</InspectorControls>

			</>
		);
	},

	/* Handle parsing the block into final markup as post content */
	save: ( attributes ) => {

		/* Add classname to props */
        const blockProps = useBlockProps.save( {
            className: 'hb__landingSection',
        } );

		/* Build JSX block for front end mark up */
		return (

			<section { ...blockProps }>

				<div className="hb__landingSection_content" >
					<p>gridColumnStart is { attributes.gridColumnStart }.</p>
					<p>gridColumnEnd is { attributes.gridColumnEnd }.</p>
					<InnerBlocks />
				</div>
				<div className="hb__landingSection_backdrop">
				</div>

			</section>

		);
	}
} );