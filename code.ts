figma.showUI(__html__);

figma.ui.resize(500, 500);

figma.ui.onmessage = (pluginMessage) => {
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

  componentToRender.createInstance();

  figma.closePlugin();
};
