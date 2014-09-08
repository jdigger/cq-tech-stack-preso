var Preso = (function(d3, dagreD3){
    'use strict';

    var dagGraph = function(sectionClass, nodes, edges) {
        var graph = dagreD3.json.decode(nodes, edges, 'digraph');

        // Render the graphlib object using d3.
        var renderer = new dagreD3.Renderer();
        renderer.zoom(false);

        var svg = d3.select('section.' + sectionClass + ' svg.graphContainer');
        var svgGroup = svg.append("g");

        // render
        var l = dagreD3.layout().rankDir("LR");
        var layout = renderer.layout(l).run(graph, svgGroup);

        // Explicitly set the size of the SVG element
        var graphWidth = layout.graph().width;
        svg.attr('width', graphWidth + 'px');
        svg.attr('height', layout.graph().height + 'px');
        // console.log('graphWidth: '+graphWidth);
        // console.log('graphHeight: '+layout.graph().height);
    };


    var dag1nodes = [
        {id: 'HEAD', value: {label: '<div class="ref">HEAD</div>'}},
        {id: 'master', value: {label: '<div class="ref">master</div>'}},
        {id: 'commit1', value: {label: '<div class="commit">a8036eb</div>'}},
        {id: 'tree', value: {label: '<div class="tree">0550b75</div>'}},
        {id: 'subtree', value: {label: '<div class="tree">cb63181</div>'}},
        {id: 'blob1', value: {label: '<div class="blob">77bd771</div>'}},
        {id: 'blob2', value: {label: '<div class="blob">63ffb2b</div>'}},
    ];
    var dag1edges = [
        {u: 'HEAD', v: 'master', value: {label: '<span>ref<br/>refs/heads/master</span>'}},
        {u: 'master', v: 'commit1', value: {label: '<span>"First good version"</span>'}},
        {u: 'commit1', v: 'tree', value: {label: '<span>tree</span>'}},
        {u: 'tree', v: 'subtree', value: {label: '<span>tree<br/>morefiles</span>'}},
        {u: 'tree', v: 'blob1', value: {label: '<span>blob<br/>file1.txt</span>'}},
        {u: 'tree', v: 'blob2', value: {label: '<span>blob<br/>file2.txt</span>'}},
        {u: 'subtree', v: 'blob1', value: {label: '<span>blob<br/>file3.txt</span>'}},
    ];

    var dag2nodes = dag1nodes.slice(0); // clone
    dag2nodes.push({id: 'commit2', value: {label: '<div class="commit">7581387</div>'}});
    dag2nodes.push({id: 'tree2', value: {label: '<div class="tree">3666127</div>'}});
    dag2nodes.push({id: 'blob3', value: {label: '<div class="blob">faff7b9</div>'}});

    var dag2edges = dag1edges.slice(0); // clone
    dag2edges[1] = {u: 'master', v: 'commit2', value: {label: '<span>"Added more cow-bell."</span>'}};
    dag2edges.push({u: 'commit2', v: 'tree2', value: {label: '<span>tree</span>'}});
    dag2edges.push({u: 'tree2', v: 'blob3', value: {label: '<span>blob<br/>file1.txt</span>'}});
    dag2edges.push({u: 'tree2', v: 'blob2', value: {label: '<span>blob<br/>file2.txt</span>'}});
    dag2edges.push({u: 'tree2', v: 'subtree', value: {label: '<span>tree<br/>morefiles</span>'}});
    dag2edges.push({u: 'commit2', v: 'commit1', value: {label: '<span>parent</span>'}});

    var dag3nodes = dag2nodes.slice(0); // clone
    dag3nodes.push({id: 'commit3', value: {label: '<div class="commit">e001241</div>'}});
    dag3nodes.push({id: 'tree3', value: {label: '<div class="tree">96996c4f</div>'}});

    var dag3edges = dag2edges.slice(0); // clone
    dag3edges[1] = {u: 'master', v: 'commit3', value: {label: '<span>"Renamed files"</span>'}};
    dag3edges.push({u: 'commit3', v: 'tree3', value: {label: '<span>tree</span>'}});
    dag3edges.push({u: 'tree3', v: 'blob3', value: {label: '<span>blob<br/>file1.txt</span>'}});
    dag3edges.push({u: 'tree3', v: 'blob2', value: {label: '<span>blob<br/>wow.txt</span>'}});
    dag3edges.push({u: 'tree3', v: 'subtree', value: {label: '<span>tree<br/>hasfiles</span>'}});
    dag3edges.push({u: 'commit3', v: 'commit2', value: {label: '<span>parent</span>'}});

    // remove the edge labels
    var dag3edges_nolabel = [];
    for (var i = dag3edges.length - 1; i >= 0; i--) {
        var edge = dag3edges[i];
        dag3edges_nolabel.push({u: edge['u'], v: edge['v'], value: {}});
    }

    return {
        drawGraphs: function() {
            dagGraph('dag1', dag1nodes, dag1edges);
            dagGraph('dag2', dag2nodes, dag2edges);
            dagGraph('dag3', dag3nodes, dag3edges);
            dagGraph('constant-time', dag3nodes, dag3edges_nolabel);
        }
    };
})(d3, dagreD3); // jshint ignore:line
