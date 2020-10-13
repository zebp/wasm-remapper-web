import React, { useContext } from "react";
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import "./Settings.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { AppContext } from "../app/App";

export type SettingsProps = {
    opened: boolean,
    closeSettings: () => void,
};

export default function Settings({ opened, closeSettings }: SettingsProps) {
    const {
        matchingThreshold, setMatchingThreshold,
        ignoreDataSectionConstants, setIgnoreDataSectionConstants,
        requireExactFunctionLocals, setRequireExactFunctionLocals
    } = useContext(AppContext);

    const style = { zIndex: opened ? 1000 : -1, display: opened ? undefined : "none" };

    return (
        <div id="settings-container" style={style}>
            <div id="settings-panel">
                <h2> Settings </h2>
                <span> Matching Threshold </span>
                <Slider
                    id="match-percentage"
                    value={matchingThreshold * 100}
                    valueLabelFormat={(value) => `${Math.round(value)}%`}
                    valueLabelDisplay="auto"
                    step={1}
                    min={0}
                    max={100}
                    onChange={(_, value: number | number[]) => setMatchingThreshold!(value as number / 100.0)}
                    style={{ width: "200px" }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={ignoreDataSectionConstants}
                            onChange={() => setIgnoreDataSectionConstants!(!ignoreDataSectionConstants)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Ignore data section constants"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={requireExactFunctionLocals}
                            onChange={() => setRequireExactFunctionLocals!(!requireExactFunctionLocals)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Require exact function locals"
                />
                <Button variant="contained" onClick={closeSettings} style={{ width: "75px", marginTop: "1rem" }}> Done </Button>
            </div>
        </div>
    );
}