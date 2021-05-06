import React, { useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "../../components/Card/Card";
import Typography from "@material-ui/core/Typography";
import EventPast from "./EventReport/EventPast";
import EventUpcoming from "./EventReport/EventUpcoming";
import { getEventReport } from "../LiveCommerce/Services/LiveCommerceService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flex: 1,
      backgroundColor: "#293245",
      height: "100%"
    },
    cardsContainer1: {
      display: "flex",
      flex: 1,
      flexDirection: "row"
    },
    cardsContainer2: {
      // display: "flex",
      // flex: 1,
      // flexDirection: 'row',
      marginTop: 20
    },
    titleEvents: {
      color: "white",
      flex: 2
    },
    allCardsContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "column"
    },
    cardHeight: {
      height: 500
    }
  })
);

export default function Dashboard(props: { className?: string }) {
  const classes = useStyles();

  const [report, setReport] = useState({
    monthly_event: 0,
    monthly_participation: 0,
    monthly_product: 0
  });

  React.useEffect(() => {
    const fetchReport = async () => {
      const reportFromServer = await getEventReport();
      console.log(reportFromServer);

      if (reportFromServer.status === "success") {
        setReport(reportFromServer.data);
        console.log(report);
      }
    };

    fetchReport();
  }, []);

  return (
    <Grid className={clsx(classes.container)}>
      <div className={clsx(classes.allCardsContainer)}>
        <div className={clsx(classes.cardsContainer1)}>
          <Card cardTitle="Aylık Bekleyen Etkinlik">
            <Typography variant="h2">{report.monthly_event}</Typography>
          </Card>
          <Card cardTitle="Toplam Katılan Müşteri">
            <Typography variant="h2">{report.monthly_participation}</Typography>
          </Card>
          <Card cardTitle="Toplam Ürün">
            <Typography variant="h2">{report.monthly_product}</Typography>
          </Card>
        </div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          className={classes.cardsContainer2}
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography variant="h4" className={classes.titleEvents}>
              Yaklaşan Etkinlikler
            </Typography>
            <EventUpcoming />
          </Grid>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography variant="h4" className={classes.titleEvents}>
              Geçmiş Etkinlikler
            </Typography>
            <EventPast />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
