import type { HTMLMapSerializer } from "@prismicio/helpers";
import { Icon } from "#components";

export const useRichTextSerializer = (): HTMLMapSerializer => {
  const IconArrow = h(Icon, { name: "material-symbols:arrow-right-alt" });

  return {
    paragraph: ({ children }) =>
      `<p class="text-justify text-neutral-200 leading-8 mt-2 my-5 ">${children}</p>`,
    heading1: ({ children }) => `<h1>${children}</h1>`,
    heading2: ({ children }) =>
      `<h2 class="text-zinc-500 font-bold text-4xl mb-2 dark:text-gray-400">${children}</h2>`,
    heading3: ({ children }) =>
      `<h3 class="ext-zinc-500 font-semibold text-2xl mb-2 dark:text-gray-400">${children}</h3>`,
    heading4: ({ children }) =>
      `<h4 class="ext-zinc-500 font-medium text-2xl mb-2 dark:text-gray-400">${children}</h4>`,
    heading5: ({ children }) => `<h5>${children}</h5>`,
    heading6: ({ children }) => `<h6>${children}</h6>`,
    strong: ({ children }) => `<strong>${children}</strong>`,
    em: ({ children }) => `<em>${children}</em>`,
    image: ({ node }) => {
      if (!node.url) {
        return "<p>Error: Missing image URL</p>";
      }

      const copyright: string = node.copyright
        ? `Photo © ${node.copyright}`
        : "";

      let img: string = `<figure class="max-w-fit cursor-pointer">
                                <img 
                                   src="${node.url}" 
                                   alt="${node.alt || "Image description"}" 
                                   width="${node.dimensions.width}" 
                                   height="${node.dimensions.height}" 
                                   class="transition duration-300 ease-in-out rounded shadow-md dark:shadow-black/30 hover:scale-105" 
                                   loading="lazy"
                                />`;

      if (node.alt || node.copyright) {
        img += `<figcaption class="mt-2 italic text-sm text-gray-500">${node.alt} ${copyright}</figcaption>`;
      }
      return `${img}</figure>`;
    },
    hyperlink: ({ node, children }) => {
      // const target = (!node.data.target)
      //     ? ''
      //     : `target="${node.data.target} " rel="noopener"`
      // const url = linkResolver(node.data)
      return `<a href="${node.data.url}" class="text-green-500 dark:text-neutral-200" target="_blank" rel="noopener" aria-label="${children}">${children}</a>`;
    },
    // list
    list: ({ children }) =>
      `<ul class="mb-6 font-light  lg:mb-8 ">${children}</ul>`,
    listItem: ({ children }) =>
      `<li class="mb-6 font-light  dark:text-slate-300"><span class="iconify i-material-symbols:arrow-right-alt text-indigo-400 dark:text-indigo-400" aria-hidden="true" style="width: 16px; height: 16px"></span> ${children}</li>`,

    // embed
    preformatted: ({ children }) =>
      `<blockquote class="border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600">${children}</blockquote>`,
  };
};
