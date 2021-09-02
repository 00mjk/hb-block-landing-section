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
 
		 const props = attributes;
 
		 // Add custom classname to json properties
		 const blockProps = useBlockProps( {
			 className: 'hb__landingSection',
		 } );
 
		 // Declare the attribute array objects as vars for later use
		 const {
			 gridColumnStart,
			 gridColumnEnd,
			 gridColumn,
			 minHeight
		 } = props
 
 
		 // Define object to use as inline CSS styles
		 const inlineGridStyle = {
			 gridColumnStart: gridColumnStart,
			 gridColumnEnd: gridColumnEnd,
			 minHeight: minHeight
		 };
 
 
		 const checkForGridColumnMatch = () => {
			 // Test if column values match, and assign the result to gridColumn
			 setAttributes( { gridColumn: gridColumnStart.split("-")[0] === gridColumnEnd.split("-")[0] ? gridColumnStart.split("-")[0] : 'custom' } );
		 };
		 checkForGridColumnMatch();
 
 
		 const options= [
			 { label: '1:1 Square', value: 'oneone' },
			 { label: '3:2 Wide', value: 'threetwo' },
			 { label: '16:9 Cinema', value: 'sixteennine' },
			 { label: 'Full Width', value: 'full' }
		 ];
 
 
		 const optionsExtended= [
			 ...options,
			 { label: 'Custom', value: 'custom', disabled: true }
		 ];
 
 
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
					 <div className="hb__landingSection_content" style={ inlineGridStyle }>
						 <p>gridColumnStart is { props.gridColumnStart }.</p>
						 <p>gridColumnEnd is { props.gridColumnEnd }.</p>
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
								 value={ props.gridColumn }
								 options={ optionsExtended }
								 onChange={ ( value ) => setAttributes( { 
									 gridColumn: value,
									 gridColumnStart: value + '-l',
									 gridColumnEnd: value + '-r'
								 } ) }
							 />
						 </PanelRow>
						 <PanelRow>
							 <SelectControl
								 label="gridColumnStart"
								 labelPosition="left"
								 title="gridColumnStart"
								 value={ props.gridColumnStart }
								 options={ options }
								 onChange={ ( value ) => setAttributes( {
									 gridColumnStart: value + '-l'
								 } ) }
							 />
						 </PanelRow>
						 <PanelRow>
							 <SelectControl
								 label="gridColumnEnd"
								 labelPosition="left"
								 title="gridColumnEnd"
								 value={ props.gridColumnEnd }
								 options={ options }
								 onChange={ ( value ) => setAttributes( {
									 gridColumnEnd: value + '-r'
								 } ) }
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
 
				 <div className="hb__landingSection_content" style={ inlineGridStyle }>
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