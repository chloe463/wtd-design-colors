import { ActionPanel, Detail, Icon, List, PushAction } from "@raycast/api";
import { useCallback, useState } from "react";
import { Color, COLOR_LIST } from "./colors";

const format = (s: string) => s.replace(/\s|-/g, "").toLocaleLowerCase();

export default function Command() {
  const [colorList, setColorList] = useState(COLOR_LIST);
  const onSearchTextChange = useCallback((text: string) => {
    const formattedText = format(text);
    const filteredList = COLOR_LIST.filter((item) => {
      return (
        format(item.id).includes(formattedText) ||
        format(item.value).includes(formattedText) ||
        format(item.name).includes(formattedText)
      );
    });
    setColorList(filteredList);
  }, []);

  return (
    <List onSearchTextChange={onSearchTextChange}>
      {colorList.map((color) => (
        <List.Item
          key={color.id}
          icon={{ source: Icon.Circle, tintColor: color.value }}
          title={color.name}
          actions={
            <ActionPanel>
              <PushAction title="Show Details" target={<ColorDetail color={color} />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

type ColorDetailProps = {
  color: Color;
};

const ColorDetail = (props: ColorDetailProps) => {
  const { color } = props;
  const { name, value } = color;

  return <Detail markdown={`# ${name}\n\n ## Summary\n value: ${value}`} />;
};
