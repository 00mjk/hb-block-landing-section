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

		let init

		console.log('init1: ' + init)

		if (typeof init === 'undefined') {
			init = 'complete';
		
			console.log('init2: ' + init)
		
			newSelectControlBoth = 
				selectControlStart.split('-')[0] == 
				selectControlEnd.split('-')[0] ? 
				selectControlStart.split('-')[0] : false;
			setAttributes( { selectControlBoth: newSelectControlBoth } );

			console.log('init3: ' + init)
		}

		const onChangeSelectControlStart = (value) => {
			testIfSelectControlStartEndSame;
			setAttributes( { 
				selectControlStart: value,
				selectControlBoth: newSelectControlBoth,
				contentDivClasses: newContentDivClasses
			} );

			console.log('start')
		}

		const onChangeSelectControlEnd = (value) => {
			testIfSelectControlStartEndSame;
			setAttributes( { 
				selectControlEnd: value,
				selectControlBoth: newSelectControlBoth,
				contentDivClasses: newContentDivClasses
			} );

			console.log('end')
		}

		const onChangeSelectControlBoth = (value) => {
			newSelectControlStart = value + '-l';
			newSelectControlEnd = value + '-r';
			setAttributes( { 
				selectControlStart: newSelectControlStart,
				selectControlEnd: newSelectControlEnd,
				selectControlBoth: value,
				contentDivClasses: newContentDivClasses
			} );

			console.log('both')
		}

		const testIfSelectControlStartEndSame = () => {
			newSelectControlBoth = 
				selectControlStart.split('-')[0] == 
				selectControlEnd.split('-')[0] ? 
				selectControlStart.split('-')[0] : false;

			console.log('test')
		}

		// Set classes from selectControl values
		const setNewClasses = (() => {
			newContentDivClasses = 'hb__landingSection_content ' + selectControlStart + ' ' + selectControlEnd;
			setAttributes( { 
				contentDivClasses: newContentDivClasses
			} );
			console.log('set ' + newContentDivClasses)
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
								onChange={ (value) => onChangeSelectControlBoth( value ) }
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumnStart"
								labelPosition="left"
								title="gridColumnStart"
								value={ selectControlStart }
								options={ optionsStart }
								onChange={ (value) => onChangeSelectControlStart( value ) }
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumnEnd"
								labelPosition="left"
								title="gridColumnEnd"
								value={ selectControlEnd }
								options={ optionsEnd }
								onChange={ (value) => onChangeSelectControlEnd( value ) }
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