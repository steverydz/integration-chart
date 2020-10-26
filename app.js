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

  svg.attr("width", dimensions.width).attr("height", dimensions.height);

  const defs = svg.append("defs");

  defs
    .append("pattern")
    .attr("id", "imageOne")
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", data.packageOne.iconPath)
    .attr("width", 70)
    .attr("height", 70);

  defs
    .append("pattern")
    .attr("id", "imageTwo")
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", data.packageTwo.iconPath)
    .attr("width", 70)
    .attr("height", 70);

  const bounds = svg.append("g");

  bounds.attr("width", dimensions.width).attr("height", dimensions.height);

  // left icon circle
  bounds
    .append("circle")
    .attr("cx", 60)
    .attr("cy", dimensions.height / 2)
    .attr("r", 60)
    .attr("fill", "#f7f7f7")
    .attr("stroke", "#cdcdcd")
    .attr("stroke-width", 1);

  bounds
    .append("circle")
    .attr("cx", 60)
    .attr("cy", dimensions.height / 2)
    .attr("r", 35)
    .attr("fill", "url(#imageOne)")
    .attr("stroke", "#e5e5e5")
    .attr("stroke-width", 1);

  bounds
    .selectAll(".left-node")
    .data(data.groups)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("cx", 119)
    .attr("cy", (d, i) => {
      console.log("a", 120 / data.groups.length);
      return dimensions.height / 2 - (120 / data.groups.length) * i + 1;
    })
    .attr("r", 6)
    .attr("fill", "#cdcdcd");

  // right icon circle
  bounds
    .append("circle")
    .attr("cx", dimensions.width - 60)
    .attr("cy", dimensions.height / 2)
    .attr("r", 60)
    .attr("fill", "#f7f7f7")
    .attr("stroke", "#cdcdcd")
    .attr("stroke-width", 1);

  bounds
    .append("circle")
    .attr("cx", dimensions.width - 60)
    .attr("cy", dimensions.height / 2)
    .attr("r", 35)
    .attr("fill", "url(#imageTwo)")
    .attr("stroke", "#e5e5e5")
    .attr("stroke-width", 1);

  bounds
    .selectAll(".right-node")
    .data(data.groups)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("cx", dimensions.width - 60 - 59)
    .attr("cy", dimensions.height / 2)
    .attr("r", 6)
    .attr("fill", "#cdcdcd");
}

buildChart(data);
