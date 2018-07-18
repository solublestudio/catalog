import React from "react";
import { catalogShape } from "../CatalogPropTypes";
import PropTypes from "prop-types";
import { css } from "../emotion";
import Specimen from "../components/Specimen/Specimen";
import { text } from "../styles/typography";
import renderMarkdown from "../markdown/renderMarkdown";

function getStyle(theme, customStyle = {}) {
  let style = {
    container: {
      flexBasis: "100%",
      overflow: "auto",
      paddingBottom: "10px"
    },
    table: {
      ...text(theme),
      borderCollapse: "collapse",
      lineHeight: "auto",
      width: "100%",
      borderBottom: `none`
    },
    tableRow: {
      borderBottom: `1px solid ${theme.lightColor}`
    },
    head: {
      fontWeigth: "bold",
      borderBottom: `2px solid ${theme.lightColor}`
    },
    cell: {
      ...text(theme),
      padding: "16px 16px  16px 0 ",
      textAlign: "left",
      verticalAlign: "top",
      ":last-child": { padding: "16px 0" },
      "& > :first-child": { marginTop: 0 },
      "& > :last-child": { marginBottom: 0 }
    }
  };

  Object.keys(customStyle).forEach(key => {
    if (!style[key]) {
      style[key] = {};
    }

    style[key] = {
      ...style[key],
      ...customStyle[key]
    };
  });

  return style;
}

const Cell = ({ value, style }) => {
  let content;
  if (typeof value === "string" || typeof value === "number") {
    content = renderMarkdown({ text: value.toString() });
  } else if (value === void 0) {
    content = <span className={css({ opacity: 0.2 })}>—</span>;
  } else {
    content = value;
  }

  return <td className={css(style)}>{content}</td>;
};

Cell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object.isRequired
};

const HeadingCell = ({ value, style }) => (
  <th className={css({ ...style, fontWeight: "bold" })}>{value}</th>
);

HeadingCell.propTypes = Cell.propTypes;

const TableHead = ({ columns, style }) => (
  <thead className={css(style.head)}>
    <tr>
      {columns.map((key, k) => (
        <HeadingCell value={key} key={k} style={style.cell} />
      ))}
    </tr>
  </thead>
);

TableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string)
};

class Table extends React.Component {
  render() {
    const {
      columns,
      rows,
      customStyle,
      catalog: { theme }
    } = this.props;
    const { cell, container, table, head, tableRow } = getStyle(
      theme,
      customStyle
    );

    const tableKeys = columns
      ? columns
      : rows
          .reduce((index, row) => index.concat(Object.keys(row)), [])
          .filter((value, i, self) => self.indexOf(value) === i);

    return (
      <section className={css(container)}>
        <table className={css(table)}>
          {columns && columns.length ? (
            <TableHead columns={columns} style={{ cell, head }} />
          ) : null}
          <tbody>
            {rows.map((row, i) => (
              <tr className={css(tableRow)} key={i}>
                {tableKeys.map((key, k) => (
                  <Cell value={row[key]} key={k} style={cell} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  catalog: catalogShape.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  customStyle: PropTypes.object,
  ...TableHead.propTypes
};

Table.defaultProps = {};
export default Specimen(undefined, undefined, { withChildren: false })(Table);
