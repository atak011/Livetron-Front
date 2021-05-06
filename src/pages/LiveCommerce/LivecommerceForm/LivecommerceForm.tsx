import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Card, Button, InputLabel, Theme, Checkbox } from "@material-ui/core";
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
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NewCollection from "./NewCollection/NewCollection";
import {
  createLivecommerce,
  getCollections,
  getProviderStatus
} from "../Services/LiveCommerceService";
import MovieIcon from "@material-ui/icons/Movie";
import TheatersIcon from "@material-ui/icons/Theaters";
import Input from "@material-ui/core/Input";

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
  tabsAndSelecteds: {
    display: "flex",
    flex: 1,
    flexDirection: "row"
  },
  tabList: {
    width: "100%",
    margin: 20
  }
}));

const LivecommerceForm = () => {
  console.log("--- LivecommerceForm ---");

  const location = useLocation();
  const livecommerceId = location.pathname.split("/").pop();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const classes = useStyles();
  const user = { id: 1, username: "react", password: "react" };
  const [collections, setCollections] = useState<any[]>([]);
  const [client_group, setClient] = useState("normal");
  const [provider, setProvider] = useState("twilio");
  const [collection, setCollection] = useState({ id: 0 });
  const [selectedCollections, setSelectedCollections] = React.useState<
    string[]
  >([]);
  const [showSelectedItems, setShowSelectedItems] = React.useState(false);

  const handleSelectedChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedCollections(event.target.value as string[]);
  };

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

  const [providers, setProviders] = useState<any[]>([]);
  useEffect(() => {
    const getProviderStatusList = async () => {
      const providersFromServer = await getProviderStatus();
      console.log("providers --> ", providersFromServer);
      if (providersFromServer.status === "success") {
        setProviders(providersFromServer.data);
      }
    };

    getProviderStatusList();
  }, []);

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

  const isFormInvalid = () => {
    return false;
  };

  const selectClient = (event: any) => {
    setClient(event.target.value);
  };
  const selectProvider = (event: any) => {
    setProvider(event.target.value);
  };

  const addNewLivecommerce = async (livecommerce: any) => {
    console.log(`addNewLivecommerce ->`, livecommerce);

    const response = await createLivecommerce(livecommerce);
    console.log({ response });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addNewLivecommerce({
      name: eventName,
      start_date: start_date,
      estimated_end_date: estimated_end_date,
      estimated_visitor: estimated_visitor,
      visitor_limit: visitor_limit,
      collections: selectedCollections,
      client_group: client_group
    });
  };

  // TABS
  const [value, setValue] = useState("1");
  const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log({ selectedCollections });
  }, [selectedCollections]);

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Card className={classes.container}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <TextField
              id="input-eventName"
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
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="outlined-client_group-native-simple">
                Müşteri
              </InputLabel>
              <Select
                labelId="outlined-client_group-native-simple"
                id="outlined-client_group-native-simple"
                value={client_group}
                onChange={selectClient}
                label="Client"
              >
                <MenuItem key="vip" value="vip">
                  Vip
                </MenuItem>
                <MenuItem key="normal" value="normal">
                  Normal
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="outlined-provider_group-native-simple">
                Provider
              </InputLabel>
              <Select
                labelId="outlined-provider_group-native-simple"
                id="outlined-provider_group-native-simple"
                value={provider}
                onChange={selectProvider}
                label="provider"
              >
                <MenuItem key="twilio" value="twilio">
                  Twilio
                </MenuItem>
                <MenuItem key="zoom" value="zoom">
                  Zoom
                </MenuItem>
                <MenuItem key="youtube" value="youtube">
                  Youtube
                </MenuItem>
              </Select>
            </FormControl>
            <TabContext value={value}>
              <AppBar
                position="static"
                color="default"
                className={classes.tabList}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Koleksiyon Seç" value="1" />
                  <Tab label="Yeni Koleksiyon" value="2" />
                </TabList>
              </AppBar>
              <div className={classes.tabsAndSelecteds}>
                <TabPanel value="1">
                  <FormControl required className={clsx(classes.formControl)}>
                    <InputLabel id="demo-mutiple-checkbox-label">
                      Koleksiyonlar
                    </InputLabel>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
                      value={selectedCollections}
                      onChange={handleSelectedChange}
                      input={<Input />}
                      renderValue={selected => {
                        var allSelected = [];

                        for (
                          let index = 0;
                          index < (selected as string[]).length;
                          index++
                        ) {
                          const selectedIndex = (selected as string[])[index];

                          for (let x = 0; x < collections.length; x++) {
                            const collectionIndex = collections[x].id;

                            if (selectedIndex == collectionIndex) {
                              allSelected.push(collections[x].name);
                            }
                          }
                        }

                        return (allSelected as string[]).join(", ");
                      }}
                      MenuProps={MenuProps}
                    >
                      {collections.map(c => (
                        <MenuItem key={c.id} value={c.id}>
                          <Checkbox
                            checked={selectedCollections.indexOf(c.id) > -1}
                          />
                          <ListItemText primary={c.name} />
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                </TabPanel>
                <TabPanel value="2">
                  <NewCollection />
                </TabPanel>
              </div>
            </TabContext>
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
      </Card>
      <Card className={classes.container}>
        <List component="nav" aria-label="main mailbox folders">
          {providers.map((provider, index) => (
            <ListItem key={provider.name} style={{ marginBottom: "5px" }}>
              <ListItemIcon>
                <MovieIcon
                  style={{
                    color: provider.status === "UP" ? "#04AA6D" : "red"
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={provider.name} />
            </ListItem>
          ))}
        </List>
      </Card>
    </Grid>
  );
};

export default LivecommerceForm;
