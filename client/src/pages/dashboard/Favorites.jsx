import React from "react";

const Favorites = () => {
  return (
    <div className="p-4">
      <h4 className="text-2xl font-semibold text-gray capitalize mb-2">
        {favs.title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {favs.templates.map((t) => (
          <TemplateCard template={t} />
        ))}
      </div>
    </div>
  );
};

const favs = [
  {
    title: "Favorites",
    templates: [
      {
        title: "Reflection on the Month of June",
        tags: ["self imrovment", "self help"],
      },
      {
        title: "Daily Gratitude",
        tags: ["self imrovment", "self help"],
      },
      {
        title: "Daily Gratitude",
        tags: ["self imrovment", "self help"],
      },
    ],
  },
];

export default Favorites;
