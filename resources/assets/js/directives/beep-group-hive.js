app.directive('beepGroupHive', ['$rootScope', function($rootScope) {
    return {
      restrict: 'EA',
      template:
          // Desktop
          '<div class="hive" ng-if="mobile == false && new == false">'+
            '<h4 class="title" ng-class="{\'hiveview\':hiveview}">{{hive.name}}</h4>'+
            '<p ng-if="hiveview" class="location notes">({{ hive.location }})</p>'+
            '<p ng-if="hive.owner" class="location notes">({{ lang.my_hive }})</p>'+
            '<p ng-if="hive.reminder != null && hive.reminder != \'\'" class="notes reminder" title="{{ hive.reminder }}">{{hive.reminder}}</p>'+
            '<p ng-if="hive.reminder_date != null && hive.reminder_date != \'\'" class="notes reminder-date">{{hive.reminder_date | amDateFormat:\'dd D MMMM YYYY HH:mm\'}}</p>'+
            '<div class="info">'+
              '<a ng-if="hive.attention == 1" href="#!/hives/{{hive.id}}/inspections" class="attention-icon" title="{{lang.needs_attention}}">!</a>'+
              '<a ng-if="hive.queen.color != null && hive.queen.color != \'\' && (hive.editable || hive.owner)" href="#!/hives/{{hive.id}}/edit" class="queen-icon" style="background-color: {{hive.queen.color}};" title="{{hive.queen.name}}"></a>'+
              '<div ng-if="hive.queen.color != null && hive.queen.color != \'\' && !(hive.editable || hive.owner)" class="queen-icon" style="background-color: {{hive.queen.color}};" title="{{hive.queen.name}}"></div>'+
              '<a ng-if="hive.impression > 0" href="#!/hives/{{hive.id}}/inspections" class="impression-icon" ng-class="{\'frown\':hive.impression==1, \'meh\':hive.impression==2, \'smile\':hive.impression==3}">'+
                '<i class="fa fa-2x" ng-class="{\'fa-frown-o\':hive.impression==1, \'fa-meh-o\':hive.impression==2, \'fa-smile-o\':hive.impression==3}"></i>'+
              '</a>'+
              '<a ng-if="hive.sensors.length > 0" ng-repeat="sensorId in hive.sensors" href="#!/measurements/{{sensorId}}" class="sensor-icon" title="{{lang.sensor}} {{sensorId}}">'+
                '<i class="fa fa-feed"></i>'+
              '</a>'+
            '</div>'+
            '<a ng-if="hive.id && (hive.editable || hive.owner)" href="#!/hives/{{hive.id}}/edit" title="{{ lang.edit }}">'+
              '<p class="lid" style="width: {{hive.width}}px;"></p>'+
              '<p ng-repeat="(key, layer) in hive.layers | orderBy : \'-type\' " class="layer" ng-class="layer.type" style="background-color: {{hive.color}}; width: {{hive.width}}px;">'+
                '<span ng-repeat="(key, frame) in layer.frames track by $index" class="frame" ng-class="layer.type"></span>'+
              '</p>'+
              '<p class="bottom" style="width: {{hive.width}}px;"></p>'+
            '</a>'+
            '<div ng-if="hive.id && !(hive.editable || hive.owner)">'+
              '<p class="lid" style="width: {{hive.width}}px;"></p>'+
              '<p ng-repeat="(key, layer) in hive.layers | orderBy : \'-type\' " class="layer" ng-class="layer.type" style="background-color: {{hive.color}}; width: {{hive.width}}px;">'+
                '<span ng-repeat="(key, frame) in layer.frames track by $index" class="frame" ng-class="layer.type"></span>'+
              '</p>'+
              '<p class="bottom" style="width: {{hive.width}}px;"></p>'+
            '</div>'+
            '<div class="btn-group" role="group" style="margin-bottom: 10px;">'+
              '<a href="#!/hives/{{hive.id}}/inspections" class="btn btn-default" title="{{lang.Inspections}}"><i class="fa fa-search"></i></a>'+
              '<a ng-if="hive.editable || hive.owner" href="#!/hives/{{hive.id}}/inspect" class="btn btn-default" title="{{lang.inspect}}"><i class="fa fa-pencil"></i></a>'+
            '</div>'+
          '</div>'+

          // Mobile
          '<div ng-if="mobile == true && new == false" class="row">'+
            '<div class="col-xs-3">'+
              '<div class="hive-container">'+
                '<a ng-if="hive.id && (hive.editable || hive.owner)" href="#!/hives/{{hive.id}}/edit" title="{{ lang.edit }}">'+
                  '<div class="hive small">'+
                    '<p class="lid" style="width: {{hive.width}}px;"></p>'+
                    '<p ng-repeat="(key, layer) in hive.layers | orderBy : \'-type\' " class="layer" ng-class="layer.type" style="background-color: {{hive.color}}; width: {{hive.width}}px;"></p>'+
                    '<p class="bottom" style="width: {{hive.width}}px;"></p>'+
                  '</div>'+
                '</a>'+
                '<div ng-if="hive.id && !(hive.editable || hive.owner)">'+
                  '<div class="hive small">'+
                    '<p class="lid" style="width: {{hive.width}}px;"></p>'+
                    '<p ng-repeat="(key, layer) in hive.layers | orderBy : \'-type\' " class="layer" ng-class="layer.type" style="background-color: {{hive.color}}; width: {{hive.width}}px;"></p>'+
                    '<p class="bottom" style="width: {{hive.width}}px;"></p>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-xs-6 hive mobile">'+
              '<p class="hive-name-mobile">{{hive.name}}</p>'+
              '<p ng-if="hiveview" class="location notes mobile">({{ hive.location }})</p>'+
              '<p ng-if="hive.owner" class="location notes mobile">({{ lang.my_hive }})</p>'+
              '<p ng-if="hive.reminder != null && hive.reminder != \'\'" class="reminder notes mobile" title="{{ hive.reminder }}">{{hive.reminder}}</p>'+
              '<p ng-if="hive.reminder_date != null && hive.reminder_date != \'\'" class="notes reminder-date">{{hive.reminder_date | amDateFormat:\'dd D MMM YYYY HH:mm\'}}</p>'+
              '<div class="info mobile">'+
                '<a ng-if="hive.attention == 1" href="#!/hives/{{hive.id}}/inspections" class="attention-icon">!</a>'+
                '<a ng-if="hive.queen.color != null && hive.queen.color != \'\' && (hive.editable || hive.owner)" href="#!/hives/{{hive.id}}/edit" class="queen-icon" style="background-color: {{hive.queen.color}};"></a>'+
                '<div ng-if="hive.queen.color != null && hive.queen.color != \'\' && !(hive.editable || hive.owner)" class="queen-icon" style="background-color: {{hive.queen.color}};"></div>'+
                '<a ng-if="hive.impression > 0" href="#!/hives/{{hive.id}}/inspections" class="impression-icon" ng-class="{\'frown\':hive.impression==1, \'meh\':hive.impression==2, \'smile\':hive.impression==3}">'+
                  '<i class="fa fa-2x" ng-class="{\'fa-frown-o\':hive.impression==1, \'fa-meh-o\':hive.impression==2, \'fa-smile-o\':hive.impression==3}"></i>'+
                '</a>'+
                '<a ng-if="hive.sensors.length > 0" ng-repeat="sensorId in hive.sensors" href="#!/measurements/{{sensorId}}" class="sensor-icon">'+
                  '<i class="fa fa-feed"></i>'+
                '</a>'+
              '</div>'+
            '</div>'+
            '<div class="col-xs-2 text-right">'+
              '<a href="#!/hives/{{hive.id}}/inspections" class="btn btn-default" title="{{lang.Inspections}}"><i class="fa fa-search"></i></a>'+
              '<br><a ng-if="hive.editable || hive.owner" href="#!/hives/{{hive.id}}/inspect" class="btn btn-default" title="{{lang.inspect}}"><i class="fa fa-pencil"></i></a>'+
            '</div>'+
          '</div>',
      scope: {
        hiveview: '=?', // show location name
        hive: '=?',
        new: '=?',
        loc: '=?',
      },
      link: function(scope, element, attributes) {
        scope.lang   = $rootScope.lang;
        scope.mobile = $rootScope.mobile;

        if (typeof scope.new == 'undefined')
          scope.new = false;
        else if (scope.new == 'true')
          scope.new = true;

        if (typeof scope.hiveview == 'undefined')
          scope.hiveview = false;
        else if (scope.hiveview == 'true')
          scope.hiveview = true;
        
      }
    };
  }
]);