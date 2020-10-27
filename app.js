const data = {
  groups: [
    ["websso-trusted-dashboard", "identity-service", "keystone"],
    // ["websso-trusted-dashboard", "identity-service", "keystone"],
    // ["websso-trusted-dashboard", "identity-service", "keystone"],
    // ["websso-trusted-dashboard", "identity-service", "keystone"],
    // ["websso-trusted-dashboard", "identity-service", "keystone"],
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
  // set dimensions
  const chartWidth = window.innerWidth * 0.8;
  const chartHeight = 600;
  const iconWidth = 70;
  const iconHeight = 70;
  const iconContainerRadius = 60;
  const iconRadius = 35;
  const nodeRadius = 6;
  const nodeWidth = nodeRadius * 2;

  // define chart wrapper
  const wrapper = d3.select("#wrapper");
  const svg = wrapper.append("svg");

  svg
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .attr("class", "integration-chart")
    .attr("style", "display: block; margin: 0 auto");

  // setup icon images
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

  // define chart bounds
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
      const angle = 102 - nodeWidth * data.groups.length;

      return `rotate(${angle + i * nodeRadius * 4}, ${
        leftOriginX - nodeRadius
      }, ${leftOriginY - nodeRadius})`;
    });

  // left node lines
  bounds
    .selectAll(".left-node-line")
    .data(data.groups)
    .enter()
    .append("path")
    .attr("class", "left-node-line")
    .attr(
      "d",
      `M ${iconContainerRadius * 2} ${chartHeight / 2} L ${
        iconContainerRadius * 4
      } ${chartHeight / 2}`
    )
    .attr("stroke", "#cdcdcd")
    .attr("stroke-width", "1")
    .attr("transform", (d, i) => {
      const angle = 12 - nodeWidth * data.groups.length;

      return `rotate(${angle + i * nodeRadius * 4}, ${
        leftOriginX - nodeRadius
      }, ${leftOriginY - nodeRadius})`;
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

  // right icon circle nodes
  const rightOriginX =
    iconContainerRadius + nodeRadius + chartWidth - iconContainerRadius * 2;
  const rightOriginY = chartHeight / 2 + nodeRadius;

  const rightNodeOriginX = rightOriginX + iconContainerRadius * Math.sin(0);
  const rightNodeOriginY = rightOriginY - iconContainerRadius * Math.cos(0);

  bounds
    .selectAll(".right-node")
    .data(data.groups)
    .enter()
    .append("circle")
    .attr("class", "right-node")
    .attr("cx", rightNodeOriginX - nodeWidth / 2)
    .attr("cy", rightNodeOriginY - nodeWidth / 2)
    .attr("r", nodeRadius)
    .attr("width", nodeWidth)
    .attr("height", nodeWidth)
    .attr("fill", "#cdcdcd")
    .attr("transform", (d, i) => {
      const angle = 102 - nodeWidth * data.groups.length;

      return `rotate(-${angle + i * nodeRadius * 4}, ${
        rightOriginX - nodeRadius
      }, ${rightOriginY - nodeRadius})`;
    });

  // right node lines
  bounds
    .selectAll(".right-node-line")
    .data(data.groups)
    .enter()
    .append("path")
    .attr("class", "right-node-line")
    .attr(
      "d",
      `M ${chartWidth - iconContainerRadius * 2} ${chartHeight / 2} L ${
        chartWidth - iconContainerRadius * 4
      } ${chartHeight / 2}`
    )
    .attr("stroke", "#cdcdcd")
    .attr("stroke-width", 1)
    .attr("transform", (d, i) => {
      const angle = 12 - nodeWidth * data.groups.length;

      return `rotate(${angle + i * nodeRadius * 4}, ${
        rightOriginX - nodeRadius
      }, ${rightOriginY - nodeRadius})`;
    });

  // center block of the chart
  bounds
    .append("rect")
    .attr("width", chartWidth - iconContainerRadius * 5)
    .attr("height", chartHeight)
    .attr("x", iconContainerRadius * 2.5)
    .attr("y", 0)
    .attr("fill", "#ffffff");
  // .attr("stroke", "#111111");

  // connecting lines
  bounds
    .selectAll(".connecting-line")
    .data(data.groups)
    .enter()
    .append("path")
    .attr("class", "connecting-line")
    .attr(
      "d",
      `M ${iconContainerRadius * 2 + 30} ${chartHeight / 2} L ${
        chartWidth - iconContainerRadius * 2 - 30
      } ${chartHeight / 2}`
    )
    .attr("stroke", "#cdcdcd")
    .attr("stroke-width", "1")
    .attr("transform", (d, i) => {
      // const angle = 102 - nodeWidth * data.groups.length;

      // return `translateY(-${angle + i * nodeRadius * 4}, ${
      //   rightOriginX - nodeRadius
      // }, ${rightOriginY - nodeRadius})`;
      return `translate(0, 0)`;
    });

  // bounds
  //   .append("path")
  //   .attr(
  //     "d",
  //     `M ${iconContainerRadius * 2 + 30} ${chartHeight / 2} L ${
  //       chartWidth - iconContainerRadius * 2 - 30
  //     } ${chartHeight / 2}`
  //   )
  //   .attr("stroke", "#cdcdcd")
  //   .attr("stroke-width", 1);

  // bounds
  //   .append("path")
  //   .attr(
  //     "d",
  //     `M ${iconContainerRadius * 2 + 30} ${chartHeight / 2 - 40} L ${
  //       chartWidth - iconContainerRadius * 2 - 30
  //     } ${chartHeight / 2 - 40}`
  //   )
  //   .attr("stroke", "#cdcdcd")
  //   .attr("stroke-width", 1);

  // bounds
  //   .append("path")
  //   .attr(
  //     "d",
  //     `M ${iconContainerRadius * 2 + 30} ${chartHeight / 2 - 100} L ${
  //       chartWidth - iconContainerRadius * 2 - 30
  //     } ${chartHeight / 2 - 100}`
  //   )
  //   .attr("stroke", "#cdcdcd")
  //   .attr("stroke-width", 1);

  // bounds
  //   .append("path")
  //   .attr(
  //     "d",
  //     `M ${iconContainerRadius * 2 + 30} ${chartHeight / 2 + 40} L ${
  //       chartWidth - iconContainerRadius * 2 - 30
  //     } ${chartHeight / 2 + 40}`
  //   )
  //   .attr("stroke", "#cdcdcd")
  //   .attr("stroke-width", 1);

  // bounds
  //   .append("path")
  //   .attr(
  //     "d",
  //     `M ${iconContainerRadius * 2 + 30} ${chartHeight / 2 + 100} L ${
  //       chartWidth - iconContainerRadius * 2 - 30
  //     } ${chartHeight / 2 + 100}`
  //   )
  //   .attr("stroke", "#cdcdcd")
  //   .attr("stroke-width", 1);
}

buildChart(data);
