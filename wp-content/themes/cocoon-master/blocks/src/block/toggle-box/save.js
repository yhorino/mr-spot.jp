import {
  InnerBlocks,
  RichText,
  getColorClassName,
  getFontSizeClass,
  useBlockProps,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save( { attributes } ) {
  const {
    content,
    dateID,
    backgroundColor,
    textColor,
    borderColor,
    customBackgroundColor,
    customTextColor,
    customBorderColor,
    fontSize,
  } = attributes;

  const backgroundClass = getColorClassName(
    'background-color',
    backgroundColor
  );
  const textClass = getColorClassName( 'color', textColor );
  const borderClass = getColorClassName( 'border-color', borderColor );
  const fontSizeClass = getFontSizeClass( fontSize );

  const className = classnames( {
    'toggle-wrap': true,
    'toggle-box': true,
    'block-box': true,
    'has-text-color': textColor || customTextColor,
    'has-background': backgroundColor || customBackgroundColor,
    'has-border-color': borderColor || customBorderColor,
    [ textClass ]: textClass,
    [ backgroundClass ]: backgroundClass,
    [ borderClass ]: borderClass,
    [ fontSizeClass ]: fontSizeClass,
  } );

  const styles = {
    '--cocoon-custom-background-color': customBackgroundColor || undefined,
    '--cocoon-custom-text-color': customTextColor || undefined,
    '--cocoon-custom-border-color': customBorderColor || undefined,
  };

  const blockProps = useBlockProps.save( {
    className: className,
    style: styles,
  } );

  return (
    <div { ...blockProps }>
      <input
        id={ 'toggle-checkbox-' + dateID }
        className="toggle-checkbox"
        type="checkbox"
      />
      <label className="toggle-button" for={ 'toggle-checkbox-' + dateID }>
        <RichText.Content value={ content } />
      </label>
      <div className="toggle-content">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
