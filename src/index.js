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

		// Declare the attribute array objects as vars for later use
		const {
			gridColumnStart,
			gridColumnEnd,
			gridColumnAll,
			minHeight
		} = attributes

		// Create an object to use as inline CSS styles
		const gridPosStyle = {
			gridColumnStart: gridColumnStart,
			gridColumnEnd: gridColumnEnd,
			minHeight: minHeight
		};

		// Get the CSS column values without the -l or -r suffixes
		let gridColumnStartTrack = gridColumnStart.split("-")[0];
		let gridColumnEndTrack = gridColumnEnd.split("-")[0];

		// Test if they match, and assign the result to gridColumnAll
		setAttributes( { gridColumnAll: gridColumnStartTrack === gridColumnEndTrack ? gridColumnStartTrack : false } );


		// Handle setting vars on user option selection
		const updateGridColumnAll = ( newValue ) => {
			setAttributes( { 
				gridColumnAll: newValue,
				gridColumnStart: newValue + '-l',
				gridColumnEnd: newValue + '-r'
			} );
			useState( gridColumnAll );
		};
		const updateGridColumnStart = ( newValue ) => {
			setAttributes( { 
				gridColumnStart: newValue + '-l'
			} );
			useState( gridColumnStart );
		};
		const updateGridColumnEnd = ( newValue ) => {
			setAttributes( { 
				gridColumnEnd: newValue + '-r'
			} );
			useState( gridColumnEnd );
		};


		const SelectControlGridColumnAll = () => {
			const [ gridColumnAll, setGridColumnAll ] = useState( 'oneone' );
		 
			return (
				<SelectControl
					label="Test"
					value={ gridColumnAll }
					options={ [
						{ label: '1:1 Square', value: 'oneone' },
						{ label: '3:2 Wide', value: 'threetwo' },
						{ label: '16:9 Cinema', value: 'sixteennine' },
						{ label: 'Full Width', value: 'full' },
						{ label: 'Custom', value: 'disabled' },
					] }
					onChange={ ( newGridColumnAll ) => setGridColumnAll( newGridColumnAll ) }
			
				/>
			);
		};



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
					<div className="hb__landingSection_content" style={ gridPosStyle }>
						<p>gridColumnStart is { gridColumnStart }.</p>
						<p>gridColumnEnd is { gridColumnEnd }.</p>
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
							<SelectControlGridColumnAll 
								id="SelectControlGridColumnAll"
								disabled="{ disabled }"
								onChange={ updateGridColumnAll }
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="Left"
								labelPosition="left"
								title="Left Edge"
								value={ gridColumnStart }
								options={ [
									{ label: '1:1 Square', value: 'oneone' },
									{ label: '3:2 Wide', value: 'threetwo' },
									{ label: '16:9 Cinema', value: 'sixteennine' },
									{ label: 'Full Width', value: 'full' }
								] }
								onChange={ updateGridColumnStart }
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="Right"
								labelPosition="left"
								title="Right Edge"
								value={ gridColumnEnd }
								options={ [
									{ label: '1:1 Square', value: 'oneone' },
									{ label: '3:2 Wide', value: 'threetwo' },
									{ label: '16:9 Cinema', value: 'sixteennine' },
									{ label: 'Full Width', value: 'full' }
								] }
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

				<div className="hb__landingSection_content" style={ gridPosStyle }>
					<p>gridColumnStart is { gridColumnStart }.</p>
					<p>gridColumnEnd is { gridColumnEnd }.</p>
					<InnerBlocks />
				</div>
				<div className="hb__landingSection_backdrop">
					<InnerBlocks />
				</div>

			</section>

		);
	}
} );