declare var d3: any;
import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit} from "@angular/core";
import {MotifDataModel} from "../../../models/data.model";

interface NodeModel {
    id: string;
    color: string;
    x: number;
    y: number;
    fx?: number;
    fy?: number;
    isFixed?: boolean;
}

interface LinkModel {
    source: string;
    target: string;
}


@Component({
    selector: "test-component",
    templateUrl: "./test.component.html",
    styleUrls: [ "../home-page.component.less" ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit {

    @Input() transitionTime = 1000;
    @Input() xmax = 10;
    @Input() ymax = 10;
    @Input() hticks = 60;
    @Input()
    dataToDraw: MotifDataModel;
    private data: { links: LinkModel[], nodes: NodeModel[] };
    hostElement; // Native element hosting the SVG container
    wrapper; // Top level SVG element
    g; // SVG Group element
    x; // X-axis graphical coordinates
    y; // Y-axis graphical coordinates
    colors = d3.scaleOrdinal(d3.schemeCategory10);
    private simulation: any;
    private link: any;
    private node: any;

    constructor(private elRef: ElementRef) {
        this.hostElement = this.elRef.nativeElement;
    }

    ngOnInit() {
        this.data = { nodes: [], links: [] };
        this.data.nodes = [];
        this.data.nodes.push({ id: "5", color: "#0099ff", x: 1, y: 0, fx: 1, fy: 0, isFixed: true });
        this.data.nodes.push({ id: "6", color: "#0099ff", x: 1, y: this.ymax, fx: 1, fy: this.ymax, isFixed: true });
        this.data.nodes.push({ id: "1", color: "#0099ff", x: this.xmax, y: 0, fx: this.xmax, fy: 0, isFixed: true });
        this.data.nodes.push({ id: "2", color: "#0099ff", x: this.xmax, y: this.ymax, fx: this.xmax, fy: this.ymax, isFixed: true });
        this.data.nodes.push({ id: "4", color: "#ff9900", x: 5, y: 5 });
        this.data.links.push({ source: "1", target: "4" });
        this.data.links.push({ source: "2", target: "4" });
        this.data.links.push({ source: "5", target: "4" });
        this.data.links.push({ source: "6", target: "4" });
        this.createChart();
    }

    private MotifDataModelConverter() {
        this.data = { nodes: [], links: [] };
        this.xmax = this.dataToDraw.motifLength * 4 + 2;
        let index = 1;
        for (let i = 1; i < this.xmax - 1; i++) {
            this.data.nodes.push({
                id: "" + index,
                color: "black",
                x: i,
                y: 0,
                fx: i,
                fy: 0,
                isFixed: true
            });
            index += 1;
        }
    }

    private createChart() {
        this.removeExistingChartFromParent();
        this.setChartDimensions();
        this.addGraphicsElement();

        this.createXAxis();
        this.createYAxis();

        this.prepareData();

        this.createLinks();
        this.createScatterPlot();
        this.createSimulation();

    }

    private setChartDimensions() {
        const viewBoxHeight = 100;
        const viewBoxWidth = 200;
        this.wrapper = d3.select(this.hostElement).append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight);
    }

    private addGraphicsElement() {
        this.g = this.wrapper.append("g")
            .attr("transform", "translate(0,0)");
    }

    private createXAxis() {
        this.x = d3.scaleLinear()
            .domain([0, this.xmax])
            .range([30, 170]);

        this.g.append("g")
            .attr("transform", "translate(0,90)")
            .style("font-size", "0")
            .style("stroke-dasharray", ("1,1"))
            .attr("stroke-width", 0.1)
            .call(d3.axisBottom(this.x).ticks(10).tickSize(-80));
    }

    private createYAxis() {
        this.y = d3.scaleLinear()
            .domain([0, this.ymax])
            .range([90, 10]);
    }

    private createScatterPlot() {
        this.node = this.g.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.data.nodes)
            .enter()
            .append("circle")
            .attr("r", (d: NodeModel) => d.isFixed ? 0.1 : 1.5)
            .style("fill", (d: NodeModel)  => d.color)
            .call(d3.drag()
                .on("start", (d) => {
                    this.dragStarted(d);
                })
                .on("drag", (d) => {
                    this.dragged(d);
                })
                .on("end", (d) => {
                    this.dragEnded(d);
                })
            );
    }

    private createLinks() {
        this.link = this.g.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.data.links)
            .enter()
            .append("line")
            .attr("stroke-width", 0.1)
            .attr("stroke", "black");
    }

    dragStarted(d) {
        if (!d3.event.active) {
            this.simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;

    }

    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    dragEnded(d) {
        if (!d3.event.active) {
            this.simulation.alphaTarget(0);
        }
        if (d.isFixed) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        } else {
            d.fx = null;
            d.fy = null;
        }

    }
    ticked() {
        this.link
            .attr("x1", d => d.source.isFixed ? d.source.fx : d.source.x)
            .attr("y1", d => d.source.isFixed ? d.source.fy : d.source.y)
            .attr("x2", d => d.target.isFixed ? d.target.fx : d.target.x)
            .attr("y2", d => d.target.isFixed ? d.target.fy : d.target.y);

        this.node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    }


    private removeExistingChartFromParent() {
        d3.select(this.hostElement).select("svg").remove();
    }

    private createSimulation() {

        this.simulation = d3.forceSimulation()
            // @ts-ignore
            .force("link", d3.forceLink<NodeModel, LinkModel>().id(d => d.id)
                .strength(0.5))
            .force("charge", d3.forceManyBody().strength(-10));

        this.simulation
            .nodes(this.data.nodes)
            .on("tick", () => {
                this.ticked();
            });

        this.simulation.force("link")
            .links(this.data.links);
    }

    private prepareData() {
        this.data.nodes = this.data.nodes.map(node => {
            const defaultNode = {
                ...node,
                x: this.x(node.x),
                y: this.y(node.y),
            };

            return node.isFixed ? {
                ...defaultNode,
                fx: this.x(node.fx),
                fy: this.y(node.fy)
            } : defaultNode;
        });
    }
}
