import { IndexTable, LegacyCard, Text } from "@shopify/polaris";

const CustomTable = ({
  data,
  columns,
  resourceName,
  condensed,
  selectable = false,
  loading = false,
}) => {
  const headings = columns.map((column) => ({
    title: column.label,
    alignment: column.alignment,
  }));

  const rowMarkup = data.map((row, index) => (
    <IndexTable.Row id={row.id} key={index} position={index}>
      {columns.map((column, i) => {
        const cellValue = row[column.field];
        let content;

        if (column.render) {
          content = column.render(row, index);
        } else {
          content = (
            <Text
              key={i}
              as="span"
              alignment={column.alignment}
              numeric={column.numeric}
              fontWeight={column.bold ? "bold" : undefined}
            >
              {cellValue}
            </Text>
          );
        }

        return (
          <IndexTable.Cell key={column.field} style={{ padding: "20px" }}>
            {content}
          </IndexTable.Cell>
        );
      })}
    </IndexTable.Row>
  ));

  return (
    <LegacyCard>
      <IndexTable
        condensed={condensed}
        resourceName={resourceName}
        itemCount={data.length}
        headings={headings}
        selectable={selectable}
        loading={loading}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
};

export default CustomTable;
