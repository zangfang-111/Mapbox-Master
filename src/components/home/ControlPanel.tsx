import { FC } from 'react';
import InputSlider from 'components/common/InputSlider';
import ControlledRadioButtonsGroup from 'components/common/RadioGroup';
import BasicSelect from 'components/common/BaseSelect';
import CheckboxLabels from 'components/common/Checkbox';
import { mapBoxStyles } from '.';
import UploadButtons from 'components/common/FileUpload';

// control panel props
interface ControlPanelProps {
  lotCoverage: number;
  floorNumber: number;
  floorHeight: number;
  setLotCoverage: (value: number) => void;
  setFloorNumber: (value: number) => void;
  setFloorHeight: (value: number) => void;
  renderType: 'click' | 'realTime';
  styleFormat: string;
  threeDFormat: boolean;
  setRenderType: (value: 'click' | 'realTime') => void;
  setStyleFormat: (value: string) => void;
  setThreeDFormat: (value: boolean) => void;
  // TODO: correct types for file, fileRef, isFileUpload
  file: any;
  fileRef: any;
  isFileUpload: (value: any) => void;
}

const ControlPanel: FC<ControlPanelProps> = ({
  lotCoverage,
  floorNumber,
  floorHeight,
  setLotCoverage,
  setFloorNumber,
  setFloorHeight,
  renderType,
  styleFormat,
  threeDFormat,
  setRenderType,
  setStyleFormat,
  setThreeDFormat,
  file,
  fileRef,
  isFileUpload,
}) => {
  return (
    <div className="control-panel" data-testid="control-panel">
      <h3>Control Panel</h3>
      <UploadButtons
        fileRef={fileRef}
        isFileUpload={isFileUpload}
        file={file}
        label="Please Upload GeoJson"
      />
      <InputSlider
        value={lotCoverage}
        setValue={setLotCoverage}
        label="Lot coverage %"
        sliderId="coverage-slider"
        inputId="coverage-input"
      />
      <InputSlider
        value={floorNumber}
        setValue={setFloorNumber}
        label="Floor number"
        sliderId="floor-number-slider"
        inputId="floor-number-input"
      />
      <InputSlider
        value={floorHeight}
        setValue={setFloorHeight}
        label="Floor height"
        sliderId="floor-height-slider"
        inputId="floor-height-input"
      />
      <ControlledRadioButtonsGroup
        value={renderType}
        setValue={setRenderType}
        label="Choose Real Time Render Type"
        clickValue="click"
        realTimeValue="realTime"
      />
      <BasicSelect
        value={styleFormat}
        setValue={setStyleFormat}
        options={mapBoxStyles}
        label="Style"
      />
      <CheckboxLabels
        checked={threeDFormat}
        setChecked={setThreeDFormat}
        label="Check 3D building format"
      />
    </div>
  );
};

export default ControlPanel;
