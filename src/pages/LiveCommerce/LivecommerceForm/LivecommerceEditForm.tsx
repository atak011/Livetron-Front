import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Card, Button, InputLabel, Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import NewCollection from "./NewCollection/NewCollection";
import {
  createLivecommerce,
  getCollections,
  getLivecommerce
} from "../Services/LiveCommerceService";

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
  },
  title: {
    padding: 16,
    margin: theme.spacing(2)
  }
}));

const LivecommerceEditForm = () => {
  console.log("--- LivecommerceEditForm ---");

  const location = useLocation();
  const livecommerceId = location.pathname.split("/").pop();

  const classes = useStyles();
  const user = { id: 1, username: "react", password: "react" };
  const [collections, setCollections] = useState<any[]>([]);
  const [client_group, setClient] = useState({ id: 2 });
  const [collection, setCollection] = useState({ id: 0 });
  const [eventName, setEventName] = useState("");
  const [estimated_visitor, setEstimatedVisitor] = useState("");
  const [visitor_limit, setVisitorLimit] = useState("");
  // TODO: estimated_end_date must be greater than start_date
  const [start_date, setStart] = useState(
    moment(new Date()).format("yyyy-MM-DDThh:mm")
  );
  const [estimated_end_date, setEnd] = useState(
    moment(new Date()).format("yyyy-MM-DDThh:mm")
  );
  useEffect(() => {
    if (livecommerceId) {
      const getLivecom = async () => {
        const livecomFromServer = await getLivecommerce(
          parseInt(livecommerceId)
        );
        if (livecomFromServer.status === "success") {
          console.log("Event-Detail :", livecomFromServer.data);

          setEventName(livecomFromServer.data.name);
          setStart(livecomFromServer.data.start_date);
          setEnd(livecomFromServer.data.estimated_end_date);
          setEstimatedVisitor(livecomFromServer.data.estimated_visitor);
          setVisitorLimit(livecomFromServer.data.visitor_limit);
          // selected collections must be come from api
        }
      };
      getLivecom();
    }
  }, []);
  useEffect(() => {
    const getCollectionList = async () => {
      const collectionsFromServer = await getCollections();
      console.log(collectionsFromServer);
      if (collectionsFromServer.status === "success") {
        setCollections(collectionsFromServer.data);
        setCollection({ id: collectionsFromServer.data[0]["id"] });
      }
    };

    getCollectionList();
  }, []);

  const isFormInvalid = () => {
    return false;
  };
  const selectCollection = (event: any) => {
    setCollection({ id: event.target.value });
  };
  const selectClient = (event: any) => {
    setClient({ id: event.target.value });
  };

  const addNewLivecommerce = (livecommerce: any) => {
    console.log(`addNewLivecommerce ->`, livecommerce);
    createLivecommerce(livecommerce).then(res => {
      console.log("response : ", res);
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewLivecommerce({
      name: eventName,
      start_date: start_date,
      estimated_end_date: estimated_end_date,
      estimated_visitor: estimated_visitor,
      visitor_limit: visitor_limit,
      collections: collections, //TODO !!!!!
      client_group: client_group
    });
  };

  // TABS
  const [value, setValue] = useState("1");
  const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card className={classes.container}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Typography variant="h5" className={clsx(classes.title)}>
          Edit Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <TextField
              id="input-eventName"
              value={eventName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEventName(e.target.value)
              }
              type="text"
              variant="outlined"
              size="small"
              className={classes.formControl}
              InputLabelProps={{
                shrink: true
              }}
              label="Etkinlik Adı"
              required
            />
            <TextField
              id="livestream-start"
              value={start_date}
              label="Başlangıç Tarihi"
              type="datetime-local"
              defaultValue={start_date}
              className={classes.formControl}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStart(e.target.value)
              }
              InputLabelProps={{
                shrink: true
              }}
              required
            />
            <TextField
              id="livestream-end"
              value={estimated_end_date}
              label="Bitiş Tarihi"
              type="datetime-local"
              defaultValue={estimated_end_date}
              className={classes.formControl}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEnd(e.target.value)
              }
              InputLabelProps={{
                shrink: true
              }}
              required
            />
            <TextField
              id="input-expected-people-number"
              value={estimated_visitor}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEstimatedVisitor(e.target.value)
              }
              type="text"
              variant="outlined"
              size="small"
              className={classes.formControl}
              InputLabelProps={{
                shrink: true,
                "aria-setsize": 200
              }}
              label="Tahmini Kişi Sayısı"
            />
            <TextField
              id="input-people-max-limit"
              value={visitor_limit}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setVisitorLimit(e.target.value)
              }
              type="text"
              variant="outlined"
              size="small"
              className={classes.formControl}
              InputLabelProps={{
                shrink: true
              }}
              label="Max. Katılımcı"
            />
            {/* <TabContext value={value}>
              <AppBar
                position="static"
                color="default"
                className={classes.formControl}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Koleksiyon Seç" value="1" />
                  <Tab label="Yeni Koleksiyon" value="2" />
                </TabList>
              </AppBar>
              <TabPanel value="1">
                <FormControl required className={clsx(classes.formControl)}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Koleksiyon Seçiniz
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={collection.id}
                    onChange={selectCollection}
                    label="Collection"
                  >
                    {collections?.map(c => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="outlined-client_group-native-simple">
                    Müşteri
                  </InputLabel>
                  <Select
                    labelId="outlined-client_group-native-simple"
                    id="outlined-client_group-native-simple"
                    value={client_group.id}
                    onChange={selectClient}
                    label="Client"
                  >
                    <MenuItem key="vip" value={1}>
                      Vip
                    </MenuItem>
                    <MenuItem key="normal" value={2}>
                      Normal
                    </MenuItem>
                  </Select>
                </FormControl>
              </TabPanel>
              <TabPanel value="2">
                <NewCollection />
              </TabPanel>
            </TabContext> */}
          </Grid>
          <Grid container justify="flex-start">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isFormInvalid()}
              className={classes.submitButton}
            >
              Kaydet
            </Button>
          </Grid>
        </form>
      </Grid>
    </Card>
  );
};

export default LivecommerceEditForm;
