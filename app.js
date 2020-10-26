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
  const chartWidth = 940;
  const chartHeight = 600;
  const iconWidth = 70;
  const iconHeight = 70;
  const iconContainerRadius = 60;
  const iconRadius = 35;
  const nodeRadius = 6;
  const nodeWidth = nodeRadius * 2;

  const wrapper = d3.select("#wrapper");
  const svg = wrapper.append("svg");

  svg.attr("width", chartWidth).attr("height", chartHeight);

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

  bounds.attr("width", chartWidth).attr("height", chartHeight);

  // left icon circle
  bounds
    .append("circle")
    .attr("cx", iconContainerRadius)
    .attr("cy", chartHeight / 2)
    .attr("r", iconContainerRadius)
    .attr("fill", "#f7f7f7")
    .attr("stroke", "#cdcdcd")
    .attr("stroke-width", 1);

  bounds
    .append("circle")
    .attr("cx", iconContainerRadius)
    .attr("cy", chartHeight / 2)
    .attr("r", iconRadius)
    .attr("fill", "url(#imageOne)")
    .attr("stroke", "#e5e5e5")
    .attr("stroke-width", 1);

  // left icon circle nodes
  const leftOriginX = iconContainerRadius + nodeRadius;
  const leftOriginY = chartHeight / 2 + nodeRadius;

  const leftNodeOriginX = leftOriginX + iconContainerRadius * Math.sin(0);
  const leftNodeOriginY = leftOriginY - iconContainerRadius * Math.cos(0);

  bounds
    .selectAll(".left-node")
    .data(data.groups)
    .enter()
    .append("circle")
    .attr("class", "left-node")
    .attr("cx", leftNodeOriginX - nodeWidth / 2)
    .attr("cy", leftNodeOriginY - nodeWidth / 2)
    .attr("r", nodeRadius)
    .attr("width", nodeWidth)
    .attr("height", nodeWidth)
    .attr("fill", "#cdcdcd")
    .attr("transform", (d, i) => {
      return `rotate(${0 + i * nodeRadius * 4}, ${leftOriginX - nodeRadius}, ${
        leftOriginY - nodeRadius
      })`;
    });

  // right icon circle
  bounds
    .append("circle")
    .attr("cx", chartWidth - iconContainerRadius)
    .attr("cy", chartHeight / 2)
    .attr("r", iconContainerRadius)
    .attr("fill", "#f7f7f7")
    .attr("stroke", "#cdcdcd")
    .attr("stroke-width", 1);

  bounds
    .append("circle")
    .attr("cx", chartWidth - iconContainerRadius)
    .attr("cy", chartHeight / 2)
    .attr("r", iconRadius)
    .attr("fill", "url(#imageTwo)")
    .attr("stroke", "#e5e5e5")
    .attr("stroke-width", 1);
}

buildChart(data);
