import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const ServiceBox = props => {
  const { upcomingInfo } = props;

  return (
    <React.Fragment>
      {upcomingInfo?.map((service, key) => (
        <div className="col-md-6" key={key}>
          <div className="service-box mt-4">
            {/* <i className={`${service.icon} text-purple h1 service-icon`} /> */}
            <h5 className="text-dark font-weight-medium service-title f-18 mb-3">
              {service.name}
            </h5>
            <p className="text-muted mb-4 f-14">
              {moment(new Date(service.start_date)).format(
                "DD/MM/YYYY, h:mm a"
              )}
            </p>
            <p className="text-muted mb-4 f-14">{service.slug}</p>
            <Link to={service.slug} className="text-purple">
              <i className="remixicon-arrow-right-fill h4" />
            </Link>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default ServiceBox;
