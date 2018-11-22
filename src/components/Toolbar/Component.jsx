import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from 'components/Button';
import IconButton from 'components/IconButton';
import CheckboxButton from 'components/CheckboxButton';
import CustomSelect from 'components/CustomSelect';
import CustomNumericInput from 'components/CustomNumericInput';

import ColorPicker from 'components/ColorPicker';
import DrawToolIcon from 'components/icons/DrawTool';
import EditToolIcon from 'components/icons/EditTool';
import { themeColors, appColors, getDarker } from 'utils/color';

import styles from './styles.module.css';

const { black, grayLightest, red } = appColors;
const propTypes = {
  isColorPickerOpen: PropTypes.bool.isRequired,
  onColorSelectClick: PropTypes.func.isRequired,

  isPlaying: PropTypes.bool.isRequired,
  isRecording: PropTypes.bool.isRequired,
  isArmed: PropTypes.bool.isRequired,
  activeTool: PropTypes.string.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleRecordClick: PropTypes.func.isRequired,
  activeColorIndex: PropTypes.number.isRequired,
  handleColorChange: PropTypes.func.isRequired,
  handleDrawToolClick: PropTypes.func.isRequired,
  handleEditToolClick: PropTypes.func.isRequired,

  isGridActive: PropTypes.bool.isRequired,
  isSnapToGridActive: PropTypes.bool.isRequired,
  isAutoQuantizeActive: PropTypes.bool.isRequired,
  handleGridToggleChange: PropTypes.func.isRequired,
  handleSnapToGridToggleChange: PropTypes.func.isRequired,
  handleAutoQuantizeChange: PropTypes.func.isRequired,

  handleTempoChange: PropTypes.func.isRequired,
  tempo: PropTypes.number.isRequired,
  scaleObj: PropTypes.object.isRequired,
  tonicsList: PropTypes.array.isRequired,
  scalesList: PropTypes.array.isRequired,
  handleTonicChange: PropTypes.func.isRequired,
  handleScaleChange: PropTypes.func.isRequired,

  isFullscreenEnabled: PropTypes.bool.isRequired,
  handleFullscreenButtonClick: PropTypes.func.isRequired,
  handleClearButtonClick: PropTypes.func.isRequired,
};

/* ---------------------- Transport ---------------------- */

function TransportControls(props) {
  const playButtonClass = props.isPlaying ? 'ion-stop' : 'ion-play';
  return (
    <div className={styles.toolbarSection}>
      <div>
        <IconButton
          iconClassName={playButtonClass}
          onClick={props.handlePlayClick}
          title="Play project (SPACE)"
        />
      </div>
      <div
        className={props.isRecording && styles.pulse}
        style={{ color: (props.isArmed || props.isRecording) && red }}
      >
        <IconButton
          iconClassName={'ion-record'}
          onClick={props.handleRecordClick}
          title="Record project to audio file"
        />
      </div>
    </div>
  );
}

TransportControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isArmed: PropTypes.bool.isRequired,
  isRecording: PropTypes.bool.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleRecordClick: PropTypes.func.isRequired,
};

/* ---------------------- Tool Select ---------------------- */

function ToolSelect(props) {
  const isDrawTool = props.activeTool === 'draw';
  const activeColor = themeColors[props.activeColorIndex];
  return (
    <div className={cx(styles.toolbarSection, styles.toolSelect)}>
      <div
        onMouseEnter={props.handleColorMouseEnter}
        onMouseLeave={props.handleColorMouseLeave}
        style={{ position: 'relative' }}
      >
        <Button
          hasBorder
          color={activeColor}
          onClick={props.onColorSelectClick}
        />
        {props.isColorPickerOpen && (
          <div
            style={{
              width: 140,
              left: 0,
              top: 45,
              height: 50,
              position: 'absolute',
            }}
          >
            <ColorPicker
              color={themeColors[props.activeColorIndex]}
              onChange={props.onColorChange}
            />
          </div>
        )}
      </div>
      <Button
        darkHover
        hasBorder
        color={isDrawTool ? black : grayLightest}
        onClick={props.handleDrawToolClick}
        title="Draw Tool (TAB to toggle)"
      >
        <DrawToolIcon fill={isDrawTool ? grayLightest : black} />
      </Button>
      <Button
        darkHover
        hasBorder
        color={!isDrawTool ? black : grayLightest}
        onClick={props.handleEditToolClick}
        title="Edit Tool (TAB to toggle)"
      >
        <EditToolIcon fill={!isDrawTool ? grayLightest : black} />
      </Button>
    </div>
  );
}

ToolSelect.propTypes = {
  activeTool: PropTypes.string.isRequired,
  handleDrawToolClick: PropTypes.func.isRequired,
  handleEditToolClick: PropTypes.func.isRequired,
  activeColorIndex: PropTypes.number.isRequired,
  onColorChange: PropTypes.func.isRequired,
  handleColorMouseEnter: PropTypes.func.isRequired,
  handleColorMouseLeave: PropTypes.func.isRequired,
  isColorPickerOpen: PropTypes.bool.isRequired,
};

/* ---------------------- Canvas ---------------------- */

function CanvasControls(props) {
  // TODO theme
  const lightGray = getDarker(grayLightest);
  return (
    <div
      className={cx(styles.toolbarSection, styles.canvasControls)}
      style={{
        borderRadius: 3,
        padding: 0,
        border: `1px solid ${lightGray}`,
        background: lightGray,
        gridGap: 1,
        overflow: 'hidden',
      }}
    >
      <div>
        <CheckboxButton
          checked={props.isGridActive}
          onChange={props.handleGridToggleChange}
          label={'Grid'}
        />
      </div>
      <div>
        <CheckboxButton
          checked={props.isSnapToGridActive}
          onChange={props.handleSnapToGridToggleChange}
          label={'Snap'}
        />
      </div>
      <div>
        <CheckboxButton
          checked={props.isAutoQuantizeActive}
          onChange={props.handleAutoQuantizeChange}
          label={'Sync'}
        />
      </div>
    </div>
  );
}

CanvasControls.propTypes = {
  isGridActive: PropTypes.bool.isRequired,
  isSnapToGridActive: PropTypes.bool.isRequired,
  isAutoQuantizeActive: PropTypes.bool.isRequired,
  handleGridToggleChange: PropTypes.func.isRequired,
  handleSnapToGridToggleChange: PropTypes.func.isRequired,
  handleAutoQuantizeChange: PropTypes.func.isRequired,
};

/* ---------------------- Musical ---------------------- */

function MusicalControls(props) {
  return (
    <div className={cx(styles.toolbarSection, styles.musicalControls)}>
      <CustomNumericInput
        onChange={props.handleTempoChange}
        value={props.tempo}
        title="Tempo"
      />
      <CustomSelect
        value={props.scaleObj.tonic.toString(true)}
        options={props.tonicsList}
        onChange={props.handleTonicChange}
        title="Key Root"
      />
      <CustomSelect
        value={props.scaleObj.name}
        options={props.scalesList}
        onChange={props.handleScaleChange}
        title="Key Mode"
      />
    </div>
  );
}

MusicalControls.propTypes = {
  scaleObj: PropTypes.object.isRequired,
  scalesList: PropTypes.array.isRequired,
  tonicsList: PropTypes.array.isRequired,
  handleScaleChange: PropTypes.func.isRequired,
  handleTonicChange: PropTypes.func.isRequired,
  handleTempoChange: PropTypes.func.isRequired,
  tempo: PropTypes.number.isRequired,
};

/* ---------------------- Other ---------------------- */

function OtherControls(props) {
  const fullscreenButtonClass = props.isFullscreenEnabled
    ? 'ion-arrow-shrink'
    : 'ion-arrow-expand';

  return (
    <div className={cx(styles.toolbarSection, styles.OtherControls)}>
      <div>
        <Button
          hasBorder
          darkHover
          color={grayLightest}
          onClick={props.handleClearButtonClick}
          title="Clear all shapes (CANNOT UNDO)"
        >
          Clear
        </Button>
      </div>
      <div>
        <IconButton
          iconClassName={fullscreenButtonClass}
          onClick={props.handleFullscreenButtonClick}
          title="Toggle Fullscreen"
        />
      </div>
    </div>
  );
}

OtherControls.propTypes = {
  isFullscreenEnabled: PropTypes.bool.isRequired,
  handleFullscreenButtonClick: PropTypes.func.isRequired,
  handleClearButtonClick: PropTypes.func.isRequired,
};

/* ================================ Toolbar ================================ */
function ToolbarComponent(props) {
  return (
    <div className={styles.toolbar}>
      <TransportControls
        isPlaying={props.isPlaying}
        isRecording={props.isRecording}
        isArmed={props.isArmed}
        handlePlayClick={props.handlePlayClick}
        handleRecordClick={props.handleRecordClick}
      />

      {/* TODO Color */}
      <ToolSelect
        handleDrawToolClick={props.handleDrawToolClick}
        activeTool={props.activeTool}
        handleEditToolClick={props.handleEditToolClick}
        activeColorIndex={props.activeColorIndex}
        onColorChange={props.handleColorChange}
        handleColorMouseEnter={props.handleColorMouseEnter}
        handleColorMouseLeave={props.handleColorMouseLeave}
        isColorPickerOpen={props.isColorPickerOpen}
      />
      <CanvasControls
        isGridActive={props.isGridActive}
        handleGridToggleChange={props.handleGridToggleChange}
        isSnapToGridActive={props.isSnapToGridActive}
        handleSnapToGridToggleChange={props.handleSnapToGridToggleChange}
        isAutoQuantizeActive={props.isAutoQuantizeActive}
        handleAutoQuantizeChange={props.handleAutoQuantizeChange}
      />
      {/* TODO tempo */}
      <MusicalControls
        scaleObj={props.scaleObj}
        scalesList={props.scalesList}
        tonicsList={props.tonicsList}
        handleTonicChange={props.handleTonicChange}
        handleScaleChange={props.handleScaleChange}
        handleTempoChange={props.handleTempoChange}
        tempo={props.tempo}
      />
      <OtherControls
        isFullscreenEnabled={props.isFullscreenEnabled}
        handleFullscreenButtonClick={props.handleFullscreenButtonClick}
        handleClearButtonClick={props.handleClearButtonClick}
      />
    </div>
  );
}

ToolbarComponent.propTypes = propTypes;

export default ToolbarComponent;
