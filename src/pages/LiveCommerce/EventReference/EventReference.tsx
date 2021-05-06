import React, {
  ChangeEvent,
  useEffect,
  useState,
  FormEvent,
  useRef
} from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Card, Button, InputLabel, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  createEventRefLink,
  getLivecommerces
} from "../Services/LiveCommerceService";
import { FileUploader } from "../FileUploader/FileUploader";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "relative",
    backgroundColor: "#fffff",
    display: "flex",
    alignItems: "center"
  },
  textField: {
    fontWeight: "bold"
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  submitButton: {
    width: "50%",
    margin: theme.spacing(2)
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}));
export default function EventRefLink() {
  const classes = useStyles();
  const childFileUploaderRef = useRef();
  const [eventRefLinkName, setEventRefLinkName] = useState("");
  const [promote, setPromote] = useState(false);
  const [image, setImage] = useState(""); // TODO image will be sent as image file
  const [selectedLivecommerce, setSelectedLiveCommerce] = useState({ id: 0 });
  const [livecommerces, setLivecommerces] = useState<any[]>([]);
  const [livecommerce, setLivecommerce] = useState({ id: 0 });
  useEffect(() => {
    const getLivecommerceList = async () => {
      const livecommercesFromServer = await getLivecommerces();
      console.log("live commerces -> ", livecommercesFromServer);

      setLivecommerces(livecommercesFromServer);
      setLivecommerce({ id: livecommercesFromServer[0]["id"] });
    };

    getLivecommerceList();
  }, []);

  const selectLivecommerce = (event: any) => {
    setLivecommerce({ id: event.target.value });
  };
  const addNewEventRefLink = (livecommerce: any) => {
    console.log(`addNewEventRefLink ->`, livecommerce);
    createEventRefLink(livecommerce).then(res => {
      console.log("response : ", res);
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewEventRefLink({
      name: eventRefLinkName,
      promote: promote,
      image: image,
      event_id: selectedLivecommerce.id
    });
  };
  return (
    <Card className={classes.container}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="input-eventRefLinkName"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEventRefLinkName(e.target.value)
          }
          type="text"
          variant="outlined"
          size="small"
          className={classes.formControl}
          InputLabelProps={{
            shrink: true
          }}
          label="Event Reference Link Name"
          required
        />
        <div className={clsx(classes.formControl)}>
          <FileUploader />
        </div>
        <FormControl required className={clsx(classes.formControl)}>
          <InputLabel id="demo-simple-select-outlined-label">
            Live Stream Seçiniz
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={livecommerce.id}
            onChange={selectLivecommerce}
            label="Livecommerce"
          >
            {livecommerces?.map(lc => (
              <MenuItem key={lc.id} value={lc.id}>
                {lc.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormGroup row className={clsx(classes.formControl)}>
          <FormControlLabel
            control={
              <Checkbox
                checked={promote}
                value={promote}
                onChange={e => setPromote(e.currentTarget.checked)}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label="Promote"
          />
        </FormGroup>
        <Grid container justify="flex-start">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submitButton}
          >
            Kaydet
          </Button>
        </Grid>
      </form>
    </Card>
  );
}
