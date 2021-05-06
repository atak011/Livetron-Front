import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { Button, Typography } from "@material-ui/core";
import CollectionListItem from "../../../../components/CollectionListItem/CollectionListItem";
import { getProducts } from "../../Services/LiveCommerceService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flex: 1,
      flexDirection: "row"
    },
    formControl: {
      margin: theme.spacing(1),
      width: 150
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    inputLabel: {
      marginTop: -8
    },
    selectedItemsContainer: {
      display: "flex",
      flex: 1,
      marginLeft: 75
    }
  })
);

export default function NewCollection() {
  const classes = useStyles();
  const [searchCondition, setSearchCondition] = React.useState("");
  const [checked, setChecked] = React.useState([1]);
  const [selectedProducts, setSelectedProducts] = React.useState([] as any);
  const [products, setProducts] = React.useState([
    { pk: 0, name: "", productimage_set: [{ image: "" }] }
  ]);

  useEffect(() => {
    const getAllProducts = async () => {
      const productsFromServer = await getProducts();
      console.log({ productsFromServer });
      setProducts(productsFromServer.results);
    };

    getAllProducts();
  }, []);

  const selectSearchcondition = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSearchCondition(event.target.value as string);
  };

  const handleClick = (item: any) => {
    console.log({ selectedProducts });
    setSelectedProducts([...selectedProducts, item]);
    // setProducts(products.filter(p => p != item))
  };

  const handleSelectedClick = (item: any) => {
    // setProducts([...selectedProducts, item]);
  };

  return (
    <div className={classes.container}>
      <div>
        <Grid container direction="row">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              className={classes.inputLabel}
              id="demo-simple-select-outlined-label"
            >
              Seç
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={searchCondition}
              onChange={selectSearchcondition}
              label="choose"
            >
              <MenuItem key="SKU" value="SKU">
                SKU
              </MenuItem>
              <MenuItem key="Stock" value="Stock">
                Stock
              </MenuItem>
              <MenuItem key="Name" value="Name">
                Name
              </MenuItem>
            </Select>
          </FormControl>

          <div>
            <TextField
              variant="outlined"
              id="input-with-icon-grid"
              label="Ara...."
            />
          </div>
        </Grid>

        <List dense className={classes.root}>
          {products.map((product,index) => {
            const labelId = `checkbox-list-secondary-label-${product}`;

            return (
              <ListItem
                key={product.pk}
                button
                onClick={() => {
                  handleClick(product.pk);
                }}
              >
                <ListItemAvatar>
                  <Avatar src={product?.productimage_set[0]?.image} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={product.name} />
                <ListItemSecondaryAction />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}
