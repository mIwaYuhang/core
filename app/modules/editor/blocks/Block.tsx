import { type RenderElementProps, useReadOnly } from "slate-react";
import { DefaultElement } from "slate-react";
import BlockImage from "./BlockImage";
import BlockVideo from "./BlockVideo";
import BlockCodeSandbox from "./BlockCodeSandbox";
import type { CustomElement } from "../types";
import { BlockType } from "../types";
import BlockToDo from "./BlockToDo";
import BlockList from "./BlockList";
import { nanoid } from "nanoid";
import BlockLink from "./BlockLink";
import BlockGroup from "./BlockGroup";
import BlockGroupView from "./BlockGroupView";
import { BlockUpdates } from "~/routes/$siteId+/blocks+/BlockUpdates";
import { BlockUpdatesView } from "~/routes/$siteId+/blocks+/BlockUpdates/view";

// If new block created when old block selected, create the following block
// Example: create checkbox block, press enter, new unchecked checkbox is created
export const CreateNewBlockFromBlock: Record<string, () => CustomElement> = {
   [BlockType.ToDo]: () => ({
      type: BlockType.ToDo,
      checked: false,
      id: nanoid(),
      children: [],
   }),
   [BlockType.BulletedList]: () => ({
      type: BlockType.BulletedList,
      id: nanoid(),
      children: [],
   }),
};

// Note: {children} must be rendered in every element otherwise bugs occur
// https://docs.slatejs.org/api/nodes/element#rendering-void-elements
// https://github.com/ianstormtaylor/slate/issues/3930
export default function Block({
   element,
   children,
   attributes,
}: RenderElementProps) {
   const readOnly = useReadOnly();

   if (element.type === BlockType.Link) {
      return <BlockLink element={element} children={children} />;
   }
   if (element.type === BlockType.Group) {
      if (readOnly) return <BlockGroupView element={element} />;
      return (
         <div {...attributes} contentEditable={false}>
            <BlockGroup element={element} />
            <div style={{ display: "none" }}>{children}</div>
         </div>
      );
   }
   if (element.type === BlockType.Updates) {
      if (readOnly) return <BlockUpdatesView element={element} />;
      return (
         <div {...attributes} contentEditable={false}>
            <BlockUpdates element={element} />
            <div style={{ display: "none" }}>{children}</div>
         </div>
      );
   }
   if (element.type === BlockType.UpdatesInline) {
      return (
         <div className="py-2.5" {...attributes}>
            {children}
         </div>
      );
   }
   if (element.type === BlockType.Paragraph) {
      return (
         <p className="mb-3" {...attributes}>
            {children}
         </p>
      );
   }
   if (element.type === BlockType.H2) {
      return <h2 {...attributes}>{children}</h2>;
   }

   if (element.type === BlockType.H3) {
      return <h3 {...attributes}>{children}</h3>;
   }

   if (element.type === BlockType.BulletedList) {
      return (
         <div {...attributes}>
            <BlockList element={element}>{children}</BlockList>
         </div>
      );
   }

   if (element.type === BlockType.ToDo) {
      return (
         <div {...attributes}>
            <BlockToDo element={element}>{children}</BlockToDo>
         </div>
      );
   }

   if (element.type === BlockType.Image) {
      return (
         <div {...attributes} contentEditable={false} className="embed">
            <BlockImage element={element} />
            <div style={{ display: "none" }}>{children}</div>
         </div>
      );
   }

   if (element.type === BlockType.Video) {
      return (
         <div {...attributes} contentEditable={false} className="embed">
            <BlockVideo element={element} />
            <div style={{ display: "none" }}>{children}</div>
         </div>
      );
   }

   if (element.type === BlockType.CodeSandbox) {
      return (
         <div {...attributes} contentEditable={false} className="embed">
            <BlockCodeSandbox element={element} />
            <div style={{ display: "none" }}>{children}</div>
         </div>
      );
   }

   return (
      <DefaultElement element={element} attributes={attributes}>
         {children}
      </DefaultElement>
   );
}
