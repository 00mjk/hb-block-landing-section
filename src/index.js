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

/**
 * Register the block "hb/landing-section".
 */
registerBlockType( 'hb/landing-section', {

	// Handle the editor block rendering
	edit: ( { attributes, setAttributes, isSelected } ) => {

		const {
			inlineStyle,
			contentDivClasses,
			selectControlStart,
			selectControlEnd,
			selectControlBoth
		} = attributes

		// selectControlValues
		let newContentDivClasses,
			newSelectControlBoth,
			newSelectControlStart,
			newSelectControlEnd;

		newSelectControlBoth = 
			selectControlStart.split('-')[0] == 
			selectControlEnd.split('-')[0] ? 
			selectControlStart.split('-')[0] : false;
		setAttributes( { selectControlBoth: newSelectControlBoth } );

		const test = () => {
			newSelectControlStart = selectControlBoth + '-l';
			setAttributes( { selectControlStart: newSelectControlStart } );
			newSelectControlEnd = selectControlBoth + '-r';
			setAttributes( { selectControlEnd: newSelectControlEnd } );			
		}



		console.log('selectControlStart: ' + selectControlStart);
		console.log('selectControlEnd: ' + selectControlEnd);
		console.log('selectControlBoth: ' + selectControlBoth);

		// Set contentDivClasses attribute
		const setClasses = (() => {

			// Build classes from selectControl values
			newContentDivClasses = 'hb__landingSection_content ' + selectControlStart + ' ' + selectControlEnd;
			setAttributes( { contentDivClasses: newContentDivClasses} );

			console.log('contentDivClasses ' + contentDivClasses);

		})();

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

		// Add classname to props
		const blockProps = useBlockProps.save( {
			className: 'hb__landingSection',
		} );

		// Build JSX block for the editor
		return (
			<>

				<section { ...blockProps }>

					{ isSelected && (
						<BorderDivs />
					) }

					<div className={ contentDivClasses } >
						<p>selectControlBoth is { selectControlBoth }.</p>
						<p>selectControlStart is { selectControlStart }.</p>
						<p>selectControlEnd is { selectControlEnd }.</p>
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
								value={ selectControlBoth }
								options={ optionsExtended }
								onChange={ (value) => setAttributes( { selectControlBoth: value } ), test }
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumnStart"
								labelPosition="left"
								title="gridColumnStart"
								value={ selectControlStart }
								options={ optionsStart }
								onChange={ (value) => setAttributes( { selectControlStart: value } ) }
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumnEnd"
								labelPosition="left"
								title="gridColumnEnd"
								value={ selectControlEnd }
								options={ optionsEnd }
								onChange={ (value) => setAttributes( { selectControlEnd: value } ) }
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
		} );

		console.log(...style);

		// Build JSX block for front end mark up
		return (

			<section { ...blockProps }>

				<div className={ contentDivClasses } style={ inlineStyle }>
					<InnerBlocks />
				</div>
				<div className="hb__landingSection_backdrop">
					<InnerBlocks />
				</div>

			</section>

		);
	}
} );