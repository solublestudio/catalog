import React from "react";
import { catalogShape } from "../CatalogPropTypes";
import PropTypes from "prop-types";
import { css } from "../emotion";
import { heading } from "../styles/typography";
import Specimen from "../components/Specimen/Specimen";
import Table from "./Table";

class Color extends React.Component {
  render() {
    const {
      catalog: { theme },
      value,
      name,
      rows
    } = this.props;

    const hasTable = rows && rows.length;
    const styles = {
      textContainer: {
        boxSizing: "border-box",
        padding: "10px 0",
        background: theme.background
      },
      title: {
        ...heading(theme, 2),
        color: theme.textColor
      },
      text: {
        fontFamily: theme.fontMono,
        margin: "10px 0 0"
      },
      table: {
        container: {
          margin: "-16px 0 0",
          padding: 0
        },
        tableRow: {
          border: "none"
        },
        cell: {
          padding: "2px 8px 2px 0",
          ":last-child": { padding: "2px 0" },
          ":first-child": { opacity: 0.2, width: "90px" },
          ":last-child p": { fontFamily: theme.fontMono }
        }
      }
    };

    return (
      <div className={css({ width: "100%" })}>
        <div className={css({ height: 120, background: value })} />
        <div className={css(styles.textContainer)}>
          <span className={css(styles.title)}>{name}</span>
          {hasTable ? (
            <Table rows={rows} customStyle={styles.table} catalog={catalog} />
          ) : (
            <div className={css(styles.text)}>{value}</div>
          )}
        </div>
      </div>
    );
  }
}

Color.propTypes = {
  catalog: catalogShape.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default Specimen()(Color);
