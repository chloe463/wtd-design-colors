import { ActionPanel, Detail, Icon, List, PushAction } from "@raycast/api";
import { useCallback, useState } from "react";
import { Color, COLOR_LIST } from "./colors";

export default function Command() {
  const [colorList, setColorList] = useState(COLOR_LIST);
  const onSearchTextChange = useCallback((text: string) => {
    const filteredList = COLOR_LIST.filter((item) => {
      return item.id.includes(text) || item.value.includes(text) || item.name.includes(text);
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
