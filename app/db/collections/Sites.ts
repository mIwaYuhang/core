import type { CollectionConfig } from "payload/types";
import { isStaff, isStaffFieldLevel, isLoggedIn } from "../../access/user";

export const sitesSlug = "sites";
export const Sites: CollectionConfig = {
   slug: sitesSlug,
   admin: {
      useAsTitle: "name",
   },
   access: {
      create: isLoggedIn,
      read: (): boolean => true,
      update: isStaff,
      delete: isStaff,
   },
   fields: [
      {
         name: "name",
         type: "text",
         required: true,
      },
      {
         name: "about",
         type: "text",
      },
      {
         name: "pinned",
         type: "array",
         label: "Pinned",
         maxRows: 4,
         labels: {
            singular: "Pinned Item",
            plural: "Pinned Items",
         },
         fields: [
            {
               name: "relation",
               type: "relationship",
               relationTo: ["customPages", "entries", "posts", "collections"],
               hasMany: false,
            },
            {
               name: "label",
               type: "select",
               options: [
                  {
                     label: "New",
                     value: "new",
                  },
                  {
                     label: "Updated",
                     value: "updated",
                  },
               ],
            },
         ],
      },
      {
         name: "slug",
         type: "text",
         unique: true,
         index: true,
      },
      {
         name: "gaTagId",
         label: "Google Analytics tag id",
         type: "text",
      },
      {
         name: "type",
         type: "select",
         required: true,
         defaultValue: "core",
         access: {
            update: isStaffFieldLevel,
         },
         options: [
            {
               label: "Core",
               value: "core",
            },
            {
               label: "Custom",
               value: "custom",
            },
         ],
      },
      {
         name: "owner",
         type: "relationship",
         relationTo: "users",
         hasMany: false,
      },
      {
         name: "admins",
         type: "relationship",
         relationTo: "users",
         hasMany: true,
         maxDepth: 2,
      },
      {
         name: "icon",
         type: "upload",
         relationTo: "images",
         admin: {
            hidden: true,
         },
      },
      {
         name: "banner",
         type: "upload",
         relationTo: "images",
         admin: {
            hidden: true,
         },
      },
      {
         name: "id",
         type: "text",
      },
      {
         name: "content",
         type: "json",
      },
   ],
};
