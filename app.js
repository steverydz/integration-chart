const data = {
  groups: [
    ["websso-trusted-dashboard", "identity-service", "keystone"],
    ["websso-trusted-dashboard", "identity-service", "keystone"],
    ["websso-trusted-dashboard", "identity-service", "keystone"],
    ["websso-trusted-dashboard", "identity-service", "keystone"],
    ["websso-trusted-dashboard", "identity-service", "keystone"],
  ],
  packageOne: {
    name: "openstack-dashboard",
    iconPath:
      "https://api.jujucharms.com/charmstore/v5/openstack-dashboard/icon.svg",
  },
  packageTwo: {
    name: "keystone",
    iconPath: "https://api.jujucharms.com/charmstore/v5/keystone-ldap/icon.svg",
  },
};

function buildChart(data) {
  const wrapper = d3.select("#wrapper");
  const svg = wrapper.append("svg");

  const dimensions = {
    width: 940,
    height: 600,
  };

  const iconWidth = 70;
  const iconHeight = 70;
  const iconContainerRadius = 60;
  const iconRadius = 35;

  svg.attr("width", dimensions.width).attr("height", dimensions.height);

  const defs = svg.append("defs");

  defs
    .append("pattern")
    .attr("id", "imageOne")
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", data.packageOne.iconPath)
    .attr("width", iconWidth)
    .attr("height", iconHeight);

  defs
    .append("pattern")
    .attr("id", "imageTwo")
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", data.packageTwo.iconPath)
    .attr("width", iconWidth)
    .attr("height", iconHeight);

  const bounds = svg.append("g");

  bounds.attr("width", dimensions.width).attr("height", dimensions.height);

  // left icon circle
  bounds
    .append("circle")
    .attr("cx", iconContainerRadius)
    .attr("cy", dimensions.height / 2)
    .attr("r", iconContainerRadius)
    .attr("fill", "#f7f7f7")
    .attr("stroke", "#cdcdcd")
    .attr("stroke-width", 1);

  bounds
    .append("circle")
    .attr("cx", iconContainerRadius)
    .attr("cy", dimensions.height / 2)
    .attr("r", iconRadius)
    .attr("fill", "url(#imageOne)")
    .attr("stroke", "#e5e5e5")
    .attr("stroke-width", 1);

  // left icon circle nodes
  const originX = 53;
  const originY = dimensions.height / 2 + 8;
  const leftCircleRadius = iconContainerRadius;

  const leftNodeOriginX = originX + leftCircleRadius * Math.sin(0);
  const leftNodeOriginY = originY - leftCircleRadius * Math.cos(0);

  const leftNodeWidth = 12;

  bounds
    .selectAll(".left-node")
    .data(data.groups)
    .enter()
    .append("circle")
    .attr("class", "left-node")
    .attr("cx", leftNodeOriginX - leftNodeWidth / 2)
    .attr("cy", leftNodeOriginY - leftNodeWidth / 2)
    .attr("r", 6)
    .attr("width", leftNodeWidth)
    .attr("height", leftNodeWidth)
    .attr("fill", "#cdcdcd")
    .attr("transform", (d, i) => {
      return `rotate(${0 + i * 20}, ${originX}, ${originY})`;
    });

  // right icon circle
  bounds
    .append("circle")
    .attr("cx", dimensions.width - iconContainerRadius)
    .attr("cy", dimensions.height / 2)
    .attr("r", iconContainerRadius)
    .attr("fill", "#f7f7f7")
    .attr("stroke", "#cdcdcd")
    .attr("stroke-width", 1);

  bounds
    .append("circle")
    .attr("cx", dimensions.width - iconContainerRadius)
    .attr("cy", dimensions.height / 2)
    .attr("r", iconRadius)
    .attr("fill", "url(#imageTwo)")
    .attr("stroke", "#e5e5e5")
    .attr("stroke-width", 1);
}

buildChart(data);
