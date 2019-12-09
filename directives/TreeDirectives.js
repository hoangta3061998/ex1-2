app.directive("nodeTree", function() {
  return {
    template: '<node ng-repeat="node in treeClone"></node>',
    replace: true,
    restrict: "E",
    scope: {
      treeClone: "=children"
    }
  };
});
app.directive("node", function($compile) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "templates/node.html",
    link: function(scope, element) {
      /*
            here we are checking that if current node has children then compiling/rendering children.
            */
      if (
        scope.node &&
        scope.node.children.site &&
        scope.node.children.site.length > 0
      ) {
        scope.node.childrenVisibility = true;
        var childNode = $compile(
          '<ul class="tree" ng-if="!node.childrenVisibility"><code-tree children="node.children.site"></code-tree></ul>'
        )(scope);
        element.append(childNode);
        if (scope.node && scope.node.children.organisation.length > 0) {
          var cn = $compile(
            '<ul class="tree" ng-if="!node.childrenVisibility"><code-tree children="node.children.organisation"></code-tree></ul>'
          )(scope);
          element.append(cn);
          console.log(scope.node.children.organisation);
          scope.node.children.organisation.forEach(item => {
              if(item.children.site){
                  console.log(item.children.site);
                  scope.item= item.children.site;
                  var cnn = $compile(
                    '<ul class="tree" ng-if="!node.childrenVisibility"><code-tree children="item"></code-tree></ul>'
                  )(scope);
                  element.append(cnn);
              } 
          })
          
        }
      } else {
        scope.node.childrenVisibility = false;
      }
    },
    controller: [
      "$scope",
      function($scope) {
        /*This function is for just toggle the visibility of children */
        $scope.toggleVisibility = function(node) {
          if (node.children) {
            node.childrenVisibility = !node.childrenVisibility;
          }
        };
        //Here we are marking check/un-check all the nodes.
        $scope.checkNode = function(node) {
          node.checked = !node.checked;

          function checkChildren(c) {
            angular.forEach(c.children.site, function(c) {
              c.checked = node.checked;
            });
          }
          checkChildren(node);
        };
      }
    ]
  };
});
app.directive("codeTree", function() {
  return {
    template: '<code ng-repeat="code in treeClone"></code>',
    replace: true,
    restrict: "E",
    scope: {
      treeClone: "=children"
    }
  };
});
app.directive("code", function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "templates/codeTree.html",
    link: function(scope, element) {
      if (scope.node && scope.node.children.site && scope.children.site > 0) {
        scope.node.childrenVisibility = true;
        var childNode = $compile(
          '<ul class="tree" ng-if="!node.childrenVisibility"><code-tree children="node.children.site"></code-tree></ul>'
        )(scope);
        element.append(childNode);
      } else {
        scope.node.childrenVisibility = false;
      }
    },
    controller: [
      "$scope",
      function($scope) {
        /*This function is for just toggle the visibility of children */
        $scope.toggleVisibility = function(node) {
          if (node.children) {
            node.childrenVisibility = !node.childrenVisibility;
          }
        };
        //Here we are marking check/un-check all the nodes.
        $scope.checkNode = function(node) {
          node.checked = !node.checked;

          function checkChildren(c) {
            angular.forEach(c.children.site, function(c) {
              c.checked = node.checked;
            });
          }
          checkChildren(node);
        };
      }
    ]
  };
});
