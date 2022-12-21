figma.showUI(__html__);

figma.ui.resize(500, 500);

figma.ui.onmessage = async (pluginMessage) => {
  await figma.loadFontAsync({ family: "Rubik", style: "Regular" });

  const postComponentSet = figma.root.findOne(
    (node) => node.type == "COMPONENT_SET" && node.name == "post"
  ) as ComponentSetNode;

  const getImageVariant = () => {
    switch (pluginMessage.imageVariant) {
      case "2":
        return "single";
      case "3":
        return "carousel";
      default:
        return "none";
    }
  };

  const componentToRender = postComponentSet.findOne(
    (node) =>
      node.type == "COMPONENT" &&
      node.name ==
        `Image=${getImageVariant()}, Dark mode=${
          pluginMessage.darkModeState ? "true" : "false"
        }`
  ) as ComponentNode;

  const newPost = componentToRender.createInstance();

  const templateName = newPost.findOne(
    (node) => node.name === "displayName" && node.type === "TEXT"
  ) as TextNode;
  const templateUsername = newPost.findOne(
    (node) => node.name == "@username" && node.type == "TEXT"
  ) as TextNode;
  const templateDescription = newPost.findOne(
    (node) => node.name == "description" && node.type == "TEXT"
  ) as TextNode;

  templateName.characters = pluginMessage.name;
  templateUsername.characters = pluginMessage.username;
  templateDescription.characters = pluginMessage.description;

  figma.closePlugin();
};
