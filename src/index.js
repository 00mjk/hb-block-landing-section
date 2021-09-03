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
import { Button, SelectControl, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { useState, Fragment } from '@wordpress/element';



/**
 * Register the block "hb/landing-section".
 */
registerBlockType( 'hb/landing-section', {

	// Handle the editor block rendering
	edit: ( { attributes, setAttributes, isSelected } ) => {

		// Declare the attribute array objects as vars for later use
		// wp attributes === React props
		let {
			inlineStyle
		} = attributes

		let selectGridStart,
			selectGridEnd,
			selectGridColumn;


		// Test if column start/end match, and assign the result to selectGridColumn
		const setSelectValuesAndAttribute = (() => {

				selectGridStart = selectGridStart ? selectGridStart : inlineStyle.gridColumn.split(" ")[0];
				selectGridEnd = selectGridEnd ? selectGridEnd : inlineStyle.gridColumn.split(" ")[2];
				selectGridColumn = selectGridStart.split('-')[0] === selectGridEnd.split('-')[0] ? selectGridStart.split('-')[0] : false;

		console.log('BOTH selectGridStart: ' + selectGridStart + ' selectGridEnd: ' + selectGridEnd + ' selectGridColumn: ' + selectGridColumn);

			setAttributes( inlineStyle.gridColumn = selectGridStart + ' / ' + selectGridEnd );
		})();



		const updateColumnStart = ( value ) => {
		console.log('START selectGridStart: ' + selectGridStart + ' selectGridEnd: ' + selectGridEnd + ' selectGridColumn: ' + selectGridColumn);
			setAttributes( { 
				inlineStyle: {
					...inlineStyle,
					gridColumn: value + ' / ' + selectGridEnd,
				}
		    } )
		};

		const updateColumnEnd = ( value ) => {
		console.log('END selectGridStart: ' + selectGridStart + ' selectGridEnd: ' + selectGridEnd + ' selectGridColumn: ' + selectGridColumn);
			setAttributes( { 
				inlineStyle: {
					...inlineStyle,
					gridColumn: selectGridStart + ' / ' + value,
				}
			} )
		};

		// Options for the select controls
		const options = (position) => [
			{ label: '1:1 Square', value: 'oneone' + position },
			{ label: '3:2 Wide', value: 'threetwo'+ position },
			{ label: '16:9 Cinema', value: 'sixteennine'+ position },
			{ label: 'Full Width', value: 'full'+ position }
		],
			optionsStart = options('-l'),
			optionsEnd = options('-r'),
			optionsExtended = [
				...options(''),
				{ label: 'Custom', value: false, disabled: true }
			];

		// Build the bordered divs to highlight grid layout in the editor
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

		// Add custom classname to json properties
		const blockProps = useBlockProps( {
			className: 'hb__landingSection',
		} );

		// Build JSX block for the editor
		return (
			<>

				<section { ...blockProps }>

					{ isSelected && (
						<BorderDivs />
					) }
					<div className="hb__landingSection_content" style={ inlineStyle }>
						<p>selectGridColumn is { selectGridColumn }.</p>
						<p>selectGridStart is { selectGridStart }.</p>
						<p>selectGridEnd is { selectGridEnd }.</p>
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
								label="gridColumn"
								labelPosition="Left"
								title="gridColumn"
								value={ selectGridColumn }
								options={ optionsExtended }
								onChange={ ( value ) => {
									setAttributes( { 
										inlineStyle: {
											...inlineStyle,
											gridColumn: value + '-l / ' + value + '-r'
										}
									} );
								}}
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumnStart"
								labelPosition="left"
								title="gridColumnStart"
								value={ selectGridStart }
								options={ optionsStart }
								onChange={ updateColumnStart }
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumnEnd"
								labelPosition="left"
								title="gridColumnEnd"
								value={ selectGridEnd }
								options={ optionsEnd }
								onChange={ updateColumnEnd }
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

	// Handle parsing the block into final markup as post content
	save: ( attributes ) => {

		// wp attributes === React props
		const {
			inlineStyle
		} = attributes

		// Add classname to props
		const blockProps = useBlockProps.save( {
			className: 'hb__landingSection',
			style: {
				"gridColumnStart": inlineStyle.newGridColumnStart,
				"gridColumnEnd": inlineStyle.newGridColumnEnd
			}
		} );

		console.log(...style);

		// Build JSX block for front end mark up
		return (

			<section { ...blockProps }>

				<div className="hb__landingSection_content" {...style}>
					<p> { /* meh */ } </p>
					{/*<InnerBlocks />*/}
				</div>
				<div className="hb__landingSection_backdrop">
					{/*<InnerBlocks />*/}
				</div>

			</section>

		);
	}
} );