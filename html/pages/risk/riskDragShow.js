//缩放相关的变量
var simple = 1500;
var usableWidth = $('.rr-drag-main').css('width').slice(0, -2) - $('.rr-drag-left').css('width').slice(0, -2);
var usableHeight = $('html').css('height').slice(0, -2) - $('.rr-drag-main').offset().top;
var scalePlateau = 1;
var baseData = [];
if (usableHeight < (usableWidth / 2)) {
    scalePlateau = usableHeight / (simple / 2);
} else {
    scalePlateau = usableWidth / simple;
}
$('#canvasShow').css({
    'width': Math.floor(simple * scalePlateau) + 'px',
    'height': Math.floor((simple / 2) * scalePlateau) + 'px'
});
$('#AgentDiv').css({
    'width': Math.floor(simple * scalePlateau) + 'px',
    'height': Math.floor((simple / 2) * scalePlateau) + 'px'
});
$('.drag-step').css('width', simple * scalePlateau + 150 + 'px');


//本地存储的一些操作
var riskTypesInfo = [];
var allRiskTypes = [];
var classifyRTinfo = '';
var posMap = {};
var posData = [];
var riskTypesOnImage = [];

var PlaceClass = 'ConstructionProject';//获取企业所处的行业类别

var target;
var possData = '';
var seveData = '';
var validRuleIDs = [];
var effectiveType = [];
var ruleEffected = [];
var rulePendingEffected = [];

// var form = new mini.Form("#propForm");
// var baseForm = new mini.Form("#baseForm");
// var riskForm = new mini.Form("#riskForm");
var imageId = $('#imageId').val();
var commenRisk = [];
var otherRisk = [];
// loadRiskType();

$(function () {
    // $.ajax({
    //     url: ctxFront + "/risk/riskReport/underlying?imageId=" + imageId,	//企业底图的url
    //     success: function (txt) {
    //         txt = txt.replace(/\\/g,"/");
    //         if (txt != 'false') {
    //             $("#img").attr("src",fileServer+"/"+ txt);
    //             var iHeight=$("#img").height();
    //             var iWidth=$("#img").width();
    //             var percent=iHeight/iWidth;
    //             var cHeight=$("#canvasShow").height();
    //             var cWidth=$("#canvasShow").width();
    //             var iwidth=cWidth;
    //             var iheight=iwidth*percent;
    //             $("#img").css("width",iwidth);
    //             $("#img").css("height",iheight);
    //
    //         } else {
    //             $('#riskReoprt', window.parent.document).attr('data-href', front + '/company/img');	//跳转到上传图片页面
    //             $('#riskReoprt', window.parent.document).trigger('click');
    //         }
    //     }
    // });
    // $.ajax({
    //     url: ctxFront + "/risk/riskReport/all?imageId=" + imageId,	//根据企业id加载所有点的信息，根据风险等级加载相应的图片
    //     success: function (data) {
    //         riskTypesOnImage = mini.decode(data)//图片上所有风险源信息
    //         $.ajax({
    //             url:ctxFront + "/risk/riskReport/all",//所有待处理的风险源信息
    //             success:function (data) {
    //                 allRiskTypes = mini.decode(data);
    //                 for(var i =0 ; i< riskTypesOnImage.length;i++){
    //                     allRiskTypes.push(riskTypesOnImage[i])
    //                 }
    //                 uploadIcon(allRiskTypes);
    //             }
    //         });
    //     }
    // }).done(function () {
    //     $('#canvasShow .drag-mark').each(function (i, elem) {
    //         /////20171013，初次加载不需要再次移动
    //         //movePointers(elem);
    //     });
    // });
    // $.ajax({
    //     type:"get",
    //     data:{data:imageId},
    //     url: ctxFront +"/risk/riskReport/RiskNumber",
    //     success:function(data){
    //         $("#riskNum").html("<p style='display: inline-block;margin-bottom:-10px;margin-right:8px;'>图上已保存的风险源有"+data+"条，标注风险源后请及时保存！<br>单个风险源复位时，请注意保存,未保存的风险源将全部复位！</p>");
    //     }
    // })

    $.getJSON('./data.json', null, function (data) {
        var txt = data['underlying'];
        txt = txt.replace(/\\/g,"/");
        if (txt != 'false') {
            // $("#img").attr("src",fileServer+"/"+ txt);
            $("#img").attr("src",'../../../public/images/timg.jpg');
            var iHeight=$("#img").height();
            var iWidth=$("#img").width();
            var percent=iHeight/iWidth;
            var cHeight=$("#canvasShow").height();
            var cWidth=$("#canvasShow").width();
            var iwidth=cWidth;
            var iheight=iwidth*percent;
            $("#img").css("width",iwidth);
            $("#img").css("height",iheight);

        } else {
            $('#riskReoprt', window.parent.document).attr('data-href', front + '/company/img');	//跳转到上传图片页面
            $('#riskReoprt', window.parent.document).trigger('click');
        }
    });
    $.getJSON('data.json', null, function (data) {
        riskTypesOnImage = data.selected;
        $.getJSON('data.json', null, function (data) {
            allRiskTypes = data.all;
            for(var i =0 ; i< riskTypesOnImage.length;i++){
                allRiskTypes.push(riskTypesOnImage[i])
            }
            uploadIcon(allRiskTypes);

            // done
            $('#canvasShow .drag-mark').each(function (i, elem) {
                /////20171013，初次加载不需要再次移动
                //movePointers(elem);
            });
        })
    })


    // $.ajax({
    //     type:"get",
    //     data:{data:imageId},
    //     url: ctxFront +"/risk/riskReport/RiskNumber",
    //     success:function(data){
    //         $("#riskNum").html("<p style='display: inline-block;margin-bottom:-10px;margin-right:8px;'>图上已保存的风险源有"+data+"条，标注风险源后请及时保存！<br>单个风险源复位时，请注意保存,未保存的风险源将全部复位！</p>");
    //     }
    // })
    $.getJSON("./data.json", "", function(data) {
        uploadIcon(data.all);
    });


});
//根据企业所处行业加载图标信息
function uploadIcon(data) {
    var allRiskTypes = data;
    var div1 = document.getElementById('canvasShow');
    // $.ajax({
    //     url: ctxStatic + "/data/drag/drag-icon-classified-and-formatted.json",
    //     success: function (data) {
    // data = mini.decode(data);
    // classifyRTinfo = data;
    // var geneHtml = '', placeHtml = '';
    // $.each(data, function (i, elem) {
    //     var childIcon = elem.PlaceClassItems;
    //     for (var s = 0; s < childIcon.length; s++) {
    //         riskTypesInfo.push(childIcon[s]);
    //     }
    // });
    riskTypesInfo = [];
    var geneHtml = '', placeHtml = '';
    var allArray = [];
    for (var i = 0; i < allArray.length; i++) {
        var obj = mini.decode(allArray[i].PlaceClassItems);
        Array.prototype.push.apply(riskTypesInfo, obj);
    }
    for (var k = 0; k < allRiskTypes.length; k++) {
        if (allRiskTypes[k].clazz != "") {
            if (allRiskTypes[k].positionX != null || allRiskTypes[k].positionY != null) {
                var div = document.createElement("div");
                $(div).attr({
                    "data-id": allRiskTypes[k].id,
                    "data-name": allRiskTypes[k].source,
                    "data-type": allRiskTypes[k].clazz,
                    "data-version": allRiskTypes[k].version,
                    "class": 'drag-mark rr-drag-icon drag-riskLevel' + allRiskTypes[k].level
                });
                $(div).css({
                    'left': allRiskTypes[k].positionX * scalePlateau + 'px',
                    'top': allRiskTypes[k].positionY * scalePlateau + 'px',
                    "width": Math.floor(40 * scalePlateau) + 'px',
                    "height": Math.floor(40 * scalePlateau) + 'px',
                    // "backgroundImage": "url(" + ctxStatic + "/img/drag/dragIcon/" + allRiskTypes[k].clazz + ".png)"

                });
                div1.appendChild(div);
            } else {
                geneHtml += "<li class=''><i class='aa rr-drag-icon rr-drag-icon-org  drag-riskLevel" + allRiskTypes[k].level + "'data-id='" + allRiskTypes[k].id + "'data-version='" + allRiskTypes[k].version + "'></i><span class='text-overflow-hidden'>" + allRiskTypes[k].location + "</span><span class='title-pop'></span></li>";
            }
        }
    }
    $.each(riskTypesInfo, function (i, elem) {
        for (var j = 0; j < allRiskTypes.length; j++) {
            if (allRiskTypes[j].industry==null || allRiskTypes[j].industry=="歌舞娱乐、经营性演出场所"){
                if (allRiskTypes[j].clazz == riskTypesInfo[i].type) {
                    commenRisk.push(allRiskTypes[j]);
                    if (allRiskTypes[j].positionX != null || allRiskTypes[j].positionY != null) {
                        var div = document.createElement("div");
                        $(div).attr({
                            "data-id": allRiskTypes[j].id,
                            "data-name": allRiskTypes[j].source,
                            "data-type": allRiskTypes[j].clazz,
                            "data-version": allRiskTypes[j].version,
                            "class": 'drag-mark rr-drag-icon drag-riskLevel' + allRiskTypes[j].level
                        });
                        $(div).css({
                            'left': allRiskTypes[j].positionX * scalePlateau + 'px',
                            'top': allRiskTypes[j].positionY * scalePlateau + 'px',
                            "width": Math.floor(40 * scalePlateau) + 'px',
                            "height": Math.floor(40 * scalePlateau) + 'px',
                            "backgroundImage": "url(" + ctxStatic + "/img/drag/dragIcon/" + allRiskTypes[j].clazz + ".png)"

                        });
                        div1.appendChild(div);
                    } else {
                        if (allRiskTypes[j].clazz == "otherRisk") {
                            if (allRiskTypes[j].source == "otherRisk") {
                                geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + riskTypesInfo[i].name + "</span><span class='title-pop'></span></li>";
                            }
                            else {
                                geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + allRiskTypes[j].source + "</span><span class='title-pop'></span></li>";
                            }
                        }
                        else {
                            geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + riskTypesInfo[i].name + "</span><span class='title-pop'></span></li>";
                        }
                    }
                }else{
                    if ("其他" == riskTypesInfo[i].industry) {
                        commenRisk.push(allRiskTypes[j]);
                        if (allRiskTypes[j].positionX != null || allRiskTypes[j].positionY != null) {
                            var div = document.createElement("div");
                            $(div).attr({
                                "data-id": allRiskTypes[j].id,
                                "data-name": allRiskTypes[j].source,
                                "data-type": allRiskTypes[j].clazz,
                                "data-version": allRiskTypes[j].version,
                                "class": 'drag-mark rr-drag-icon drag-riskLevel' + allRiskTypes[j].level
                            });
                            $(div).css({
                                'left': allRiskTypes[j].positionX * scalePlateau + 'px',
                                'top': allRiskTypes[j].positionY * scalePlateau + 'px',
                                "width": Math.floor(40 * scalePlateau) + 'px',
                                "height": Math.floor(40 * scalePlateau) + 'px',
                                "backgroundImage": "url(" + ctxStatic + "/img/drag/dragIcon/" + allRiskTypes[j].clazz + ".png)"

                            });
                            div1.appendChild(div);
                        } else {
                            if (allRiskTypes[j].clazz == "otherRisk") {
                                if (allRiskTypes[j].source == "otherRisk") {
                                    geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + riskTypesInfo[i].name + "</span><span class='title-pop'></span></li>";
                                }
                                else {
                                    geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + allRiskTypes[j].source + "</span><span class='title-pop'></span></li>";
                                }
                            }
                            else {
                                geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + riskTypesInfo[i].name + "</span><span class='title-pop'></span></li>";
                            }
                        }
                    }
                }
            } else{
                if (allRiskTypes[j].industry == riskTypesInfo[i].industry &&  allRiskTypes[j].clazz == riskTypesInfo[i].type) {
                    commenRisk.push(allRiskTypes[j]);
                    if (allRiskTypes[j].positionX != null || allRiskTypes[j].positionY != null) {
                        var div = document.createElement("div");
                        $(div).attr({
                            "data-id": allRiskTypes[j].id,
                            "data-name": allRiskTypes[j].source,
                            "data-type": allRiskTypes[j].clazz,
                            "data-version": allRiskTypes[j].version,
                            "class": 'drag-mark rr-drag-icon drag-riskLevel' + allRiskTypes[j].level
                        });
                        $(div).css({
                            'left': allRiskTypes[j].positionX * scalePlateau + 'px',
                            'top': allRiskTypes[j].positionY * scalePlateau + 'px',
                            "width": Math.floor(40 * scalePlateau) + 'px',
                            "height": Math.floor(40 * scalePlateau) + 'px',
                            "backgroundImage": "url(" + ctxStatic + "/img/drag/dragIcon/" + allRiskTypes[j].clazz + ".png)"

                        });
                        div1.appendChild(div);
                    } else {
                        if (allRiskTypes[j].clazz == "otherRisk") {
                            if (allRiskTypes[j].source == "otherRisk") {
                                geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + riskTypesInfo[i].name + "</span><span class='title-pop'></span></li>";
                            }
                            else {
                                geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + allRiskTypes[j].source + "</span><span class='title-pop'></span></li>";
                            }
                        }
                        else {
                            geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + riskTypesInfo[i].name + "</span><span class='title-pop'></span></li>";
                        }
                    }
                }else{
                    if ("其他" == riskTypesInfo[i].industry &&  allRiskTypes[j].clazz == riskTypesInfo[i].type) {
                        commenRisk.push(allRiskTypes[j]);
                        if (allRiskTypes[j].positionX != null || allRiskTypes[j].positionY != null) {
                            var div = document.createElement("div");
                            $(div).attr({
                                "data-id": allRiskTypes[j].id,
                                "data-name": allRiskTypes[j].source,
                                "data-type": allRiskTypes[j].clazz,
                                "data-version": allRiskTypes[j].version,
                                "class": 'drag-mark rr-drag-icon drag-riskLevel' + allRiskTypes[j].level
                            });
                            $(div).css({
                                'left': allRiskTypes[j].positionX * scalePlateau + 'px',
                                'top': allRiskTypes[j].positionY * scalePlateau + 'px',
                                "width": Math.floor(40 * scalePlateau) + 'px',
                                "height": Math.floor(40 * scalePlateau) + 'px',
                                "backgroundImage": "url(" + ctxStatic + "/img/drag/dragIcon/" + allRiskTypes[j].clazz + ".png)"

                            });
                            div1.appendChild(div);
                        } else {
                            if (allRiskTypes[j].clazz == "otherRisk") {
                                if (allRiskTypes[j].source == "otherRisk") {
                                    geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + riskTypesInfo[i].name + "</span><span class='title-pop'></span></li>";
                                }
                                else {
                                    geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + allRiskTypes[j].source + "</span><span class='title-pop'></span></li>";
                                }
                            }
                            else {
                                geneHtml += "<li><i class='rr-drag-icon aa rr-drag-icon-org  drag-riskLevel" + allRiskTypes[j].level + "' style='background-image:url(" + ctxStatic + "/" + riskTypesInfo[i].img + ")' data-type='" + riskTypesInfo[i].type + "' data-name='" + riskTypesInfo[i].name + "'data-id='" + allRiskTypes[j].id + "'data-version='" + allRiskTypes[j].version + "'></i><span data-id='" + allRiskTypes[j].id + " 'class='text-overflow-hidden'>" + riskTypesInfo[i].name + "</span><span class='title-pop'></span></li>";
                            }
                        }
                    }
                }
            }

        }
    })
    $('#geneRisk').html(geneHtml);
    // }
    // }).done(function () {
    $('#canvasShow .drag-mark').each(function (i, elem) {
        movePointers(elem);
        posMap = {};
    });
    //鼠标移入的时候出现提示消息框
    $('.rr-drag-toolbar li').hover(function () {
        $('.pop-icon-name').html($(this).children('.rr-drag-icon-org').attr('data-name'));
        $('.left-icon-pop').show().css({
            top: $(this).offset().top - 20 + 'px',
            left: $(this).offset().left - 10 + 'px',
            zIndex: 5000
        });
    }, function () {
        $('.left-icon-pop').hide();
    });
    //绑定复制事件
    $('.rr-drag-toolbar .rr-drag-icon-org').each(function (i, ins) {
        drag(ins);

    });
    // });

}
function getAllRisk(){
    //动态加载已经上报了的风险
    $.ajax({
        url: ctxFront + "/risk/riskReport/all?imageId=" + imageId,	//根据企业id加载所有点的信息，根据风险等级加载相应的图片
        //        data: { 'company': id },
        success: function (data) {
            riskTypesOnImage = data;
            riskTypesOnImage = mini.decode(riskTypesOnImage);//图片上所有风险源信息
            $.ajax({
                url:ctxFront + "/risk/riskReport/all",//所有待处理的风险源信息
                success:function (data) {
                    data = mini.decode(data);
                    allRiskTypes = data;
                    for(var i =0 ; i< riskTypesOnImage.length;i++){
                        allRiskTypes.push(riskTypesOnImage[i])
                    }
                }
            });
        }
    }).done(function () {
        $('#canvasShow .drag-mark').each(function (i, elem) {
            movePointers(elem);
        });
    });
}


//搜索
function search() {
    var RiskLocation = mini.get("RiskLocation").getValue();
    var RiskSource = mini.get("RiskSource").getValue();
    $.ajax({
        url: ctxFront + "/risk/riskReport/all?RiskLocation=" + RiskLocation+"&RiskSource="+RiskSource,//所有待处理的风险源信息
        success: function (data) {
            data = mini.decode(data);
            var riskData = data;
            for (var i = 0; i < riskTypesOnImage.length; i++) {
                riskData.push(riskTypesOnImage[i])
            }
            uploadIcon(riskData);
        }
    });
    $("#selectInfo").css("display","none");
    $("#showImg").css("display","block")
}
//调用目标元素移动事件
function movePointers(elem) {
    var version = '';
    var elem = $(elem)
    var beforeTop = $(elem).css('top').slice(0, -2);
    var beforeLeft = $(elem).css("left").slice(0, -2);

    version = elem.attr("data-version");
    ////20171013，必须是已经在平面图范围内的才能被记录坐标之后进行保存
    if(elem.hasClass("drag-mark")) {
        posMap[elem.attr("data-id")] = {
            id: elem.attr("data-id"),
            version: elem.attr("data-version"),
            "positionX": (elem.css('left').slice(0, -2) / scalePlateau),
            "positionY": (elem.css('top').slice(0, -2) / scalePlateau)
        }
    }
    //改变拖拽框的位置限制，改变拖拽框的相对位置的父元素
    $(elem).Tdrag({
        scope: '#img',
        cbStart: function () {
            $(elem).trigger('mouseleave');
        },
        cbMove: function (e) {
            $(elem).trigger('mouseleave');
        },
        cbEnd: function () {
            movePoint($(elem), beforeTop, beforeLeft,version);
            $(elem).trigger('mouseenter');
        },
        pos:false,
        disable: true
    });
}

//鼠标移到图标上出来工具框
$('#canvasShow').on('mouseenter', '.drag-mark', function (e) {
    $('#mainTool').css({'width': 'auto', 'right': 'auto'});
    target = $(e.target);
    var id = $(target).attr("data-id");
    var pleft = parseInt($(e.target).css('left'));
    var ptop = parseInt($(e.target).css('top'));
    var pright = parseInt($(e.target).css('right'));
    var pWidth = parseInt($(e.target).css('width'));
    var pHeight = parseInt($(e.target).css('height'));
    var propWidth = parseInt($('#propMain').css('width'));
    updateData(allRiskTypes,id)
    $('.drag-prop-triangle').removeClass('drag-prop-triangle-right').addClass('drag-prop-triangle-left');
    $('#propMain').css({'left': pleft + pWidth + 20 + 'px', 'top': ptop + pHeight / 2 - 17 + 'px'});
    $('#mainTool').css({'left': 0, 'top': 0});
    $('#propMain').show();
});
$('#canvasShow').on('mouseleave', '.drag-mark', function (e) {
    $('#mainTool').css({'width': 'auto'});
    $('#propMain').hide();
    $('#propForm').hide();
    // form.clear();
    possData = '';
    seveData = '';
    validRuleIDs = [];
    ruleEffected = [];
    rulePendingEffected = [];
    effectiveType = [];
});
$('#btnView').click(function () {
    if (!target.attr('data-id')) {
        // mini.alert('该风险还未上报，不能查看详细信息');
        $(".mini-messagebox .mini-messagebox-content td").css({
            'font-size': '14px',
            'font-family': '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
            'padding': '8px 0',
            'color': '#666666'
        });
        $(".mini-messagebox .mini-messagebox-table").css({'margin-top': '72px'});
        $(".mini-messagebox .mini-messagebox-table td:first").hide()

    } else {
        updateData(target,target.attr('data-id'))
        $('#propForm').show();
    }
});
$('#closeBtn').click(function(){
    $("#propMain").hide();
    $('#propForm').hide();
})

$('.rr-drag-toolbar').on('mouseenter', '.aa', function (e) {
    if(e.target.tagName=="SPAN"){
        $('#propMain').hide();
    }
    target = $(e.target);
    var id = $(target).attr("data-id");
    var pleft = parseInt(target.offset().left);
    var ptop = parseInt(target.offset().top);
    var pright = parseInt($(e.target).css('right'));
    var pWidth = parseInt($(e.target).css('width'));
    var pHeight = parseInt($(e.target).css('height'));
    var propWidth = parseInt($('#leftpropMain').css('width'));
    updateData(allRiskTypes,id)
    $('#propMain').css({
        'left': pleft+pWidth-180 + 'px',
        'right':pleft+pWidth-180 + 'px',
        'top': ptop-80+'px'
    });
    $('#propMain').show();
});
$('.rr-drag-toolbar').on('mouseleave', '.aa', function (e) {
    $('#mainTool').css({'width': 'auto'});
    $('#leftpropMain').hide();

    $('#propForm').hide();
    // form.clear();
    possData = '';
    seveData = '';
    validRuleIDs = [];
    ruleEffected = [];
    rulePendingEffected = [];
    effectiveType = [];
});
$('#drag-left').on('mouseleave', function (e) {
    $('#propMain').hide();
    // form.clear();
    possData = '';
    seveData = '';
    validRuleIDs = [];
    ruleEffected = [];
    rulePendingEffected = [];
    effectiveType = [];
});
$('#propMain').mouseenter(function () {
    $('#propMain').show()
});

//更改单个风险源输入框的信息
function modiFormData(data, target) {
    data.id = target.attr('data-id'); //获取这个点的id
    var json = mini.encode(data);
    $.ajax({
        url: ctxFront + "/risk/riskReport/singleEdit", //修改提交的地址！！！
        data: {
            data: json
        },
        type: "post",
        success: function (txt) {
            if (txt == 'err') {
                // mini.alert('修改出现问题');
                $(".mini-messagebox .mini-messagebox-content td").css({
                    'font-size': '14px',
                    'font-family': '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
                    'padding': '8px 0',
                    'color': '#666666'
                });
                $(".mini-messagebox .mini-messagebox-table").css({'margin-top': '72px'});
                $(".mini-messagebox .mini-messagebox-table td:first").hide()
            } else {
                //如果成功需要返回新保存的数据的ID
                //编辑框不可动
                // form.setEnabled(false);
                // mini.alert("修改成功！");
                $(".mini-messagebox .mini-messagebox-content td").css({
                    'font-size': '14px',
                    'font-family': '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
                    'padding': '8px 0',
                    'color': '#666666'
                });
                $(".mini-messagebox .mini-messagebox-table").css({'margin-top': '72px'});
                $(".mini-messagebox .mini-messagebox-table td:first").hide()
                $(".mini-messagebox-content").addClass("change");
                $('#propForm').hide();
                $('#propMain').hide()
            }
        }
    });
}

//点击复位
$("#btnDel").click(function(){
    var  modifyPosition = {"id":$(target).attr('data-id')};
    $.ajax({
        type:'post',
        url:ctxFront+'/risk/riskReport/resetRiskSource',
        data:{"id":$(target).attr('data-id')},
        success:function(data){
            if(data == "success") {
                window.location.reload();
            }else {
                mini.alert("重置失败！");
                $(".mini-messagebox .mini-messagebox-content td").css({
                    'font-size': '14px',
                    'font-family': '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
                    'padding': '8px 0',
                    'color': '#666666'
                });
                $(".mini-messagebox .mini-messagebox-table").css({'margin-top': '72px'});
                $(".mini-messagebox .mini-messagebox-table td:first").hide()
            }
        }
    })



})
//点击重置按钮后清空表单
$('#btnReset').click(function () {
    form.reset();
    possData = '';
    seveData = '';
    validRuleIDs = [];
    ruleEffected = [];
    rulePendingEffected = [];
    effectiveType = [];
});


//每次移动元素提交元素位置 获取移动元素位置
function movePoint(elem, beforeTop, beforeLeft,version) {
    var leftDiff = Math.abs(beforeLeft - elem.css('left').slice(0, -2));
    var topDiff = Math.abs(beforeTop - elem.css('top').slice(0, -2));
    if (elem.attr('data-id')) {
        /*if (leftDiff >= 10 && topDiff >= 10) {*/
        posMap[elem.attr("data-id")] =   {
            id: elem.attr("data-id"),
            version:version,
            "positionX": (elem.css('left').slice(0, -2) / scalePlateau),
            "positionY": (elem.css('top').slice(0, -2) / scalePlateau)

        }
        // }
    }
}
// 点击确定提交风险源
function submitRisk(){
    for(var k in posMap){
        posData.push(posMap[k])
    }
    if(posData.length==0){
        mini.alert("位置未修改，无需提交！","",function(action){
        })
        $(".mini-messagebox .mini-messagebox-content td").css({
            'font-size': '14px',
            'font-family': '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
            'padding': '8px 0',
            'color': '#666666'
        });
        $(".mini-messagebox .mini-messagebox-table").css({'margin-top': '72px'});
        $(".mini-messagebox .mini-messagebox-table td:first").hide()
    }else{
        for(var i=0;i<posData.length;i++){
            posData[i].imageId = imageId;
        }
        $.ajax({
            type: "post",
            url: ctxFront + "/risk/riskReport/positionEdit", //提交修改，根据id修改坐标，只修改位置！！！
            data: {data:mini.encode(posData)},
            success: function (txt) {
                if (txt == 'err') {
                    mini.alert('移动出现问题');
                    $(".mini-messagebox .mini-messagebox-content td").css({
                        'font-size': '14px',
                        'font-family': '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
                        'padding': '8px 0',
                        'color': '#666666'
                    });
                    $(".mini-messagebox .mini-messagebox-table").css({'margin-top': '72px'});
                    $(".mini-messagebox .mini-messagebox-table td:first").hide()
                    location.reload();
                }else{
                    mini.alert("提交成功！","",function(action){
                        if(action == "ok" || action == "close"){
                            $.ajax({
                                type:"get",
                                data:{data:imageId},
                                url: ctxFront +"/risk/riskReport/RiskNumber",
                                success:function(data){
                                    //20171013提交时将队列清空
                                    posMap={};
                                    $('#canvasShow .drag-mark').each(function (i, elem) {
                                        //movePointers(elem);
                                    });
                                    $("#riskNum").html("图上包含"+data+"条风险源");
                                }
                            })
                        }
                    });
                    $(".mini-messagebox .mini-messagebox-content td").css({
                        'font-size': '14px',
                        'font-family': '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
                        'padding': '8px 0',
                        'color': '#666666'
                    });
                    $(".mini-messagebox .mini-messagebox-table").css({'margin-top': '72px'});
                    $(".mini-messagebox .mini-messagebox-table td:first").hide()
                    $(".mini-messagebox-content").addClass("change");
                    getAllRisk();
                }
                posData = [];
            }
        });
    }



}

//加载数据信息
function loadFormData(elem) {
    var id = elem.attr('data-id');
    $.ajax({
        url: ctxFront + "/risk/riskReport/getSingle",	 //根据id获取某个点的完整信息
        data: {"id": id}, //现在选中的点的ID
        success: function (data) {
            data = mini.decode(data);
            riskForm.setData(data);
            baseForm.setData(mini.decode(data.info));
            possData = mini.decode(data.possibilityJson);
            seveData = mini.decode(data.seriousJson);
            mini.get('btnEditp').setText(data.possibility);
            mini.get('btnEdits').setText(data.serious);
            mini.get('btnEditr').setText(data.ruleNames);
            if (data.selectedRuleIds == null){
                validRuleIDs =[];
            }else {
                validRuleIDs = data.selectedRuleIds.split(",");
            }
            mini.get('riskProgressbar').setValue(data.level * 25);
        }
    });
}
//判断父元素的位置，限定不能脱出父元素
function canMove(elem) {
    var top = parseInt(elem.css('top').slice(0, -2));
    var left = parseInt(elem.css('left').slice(0, -2));
    var minWidth = parseInt($('#canvasShow').position().left) + parseInt($('#canvasShow').css('marginLeft').slice(0, -2));
    var maxWidth = minWidth + parseInt($('#canvasShow').css('width').slice(0, -2)) - 30;
    var minHeight = parseInt($('#canvasShow').position().top);
    var maxHeight = minHeight + parseInt($('#canvasShow').css('height').slice(0, -2)) - 30;
    if (top > maxHeight) {
        elem.css('top', maxHeight + 'px');
    } else if (top < minHeight) {
        elem.css('top', minHeight + 'px');
    }
    if (left > maxWidth) {
        elem.css('left', maxWidth + 'px');
    } else if (left < minWidth) {
        elem.css('left', minWidth + 'px');
    }
}

/**
 * 中国标准时间转换
 * @param dateStr
 * @returns {number}
 */
function  getMillionSecond(dateStr) {
    var d = new Date(dateStr);
    var month = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
    var day = d.getDate() > 9 ? d.getDate(): '0' + d.getDate();
    var standTime = d.getFullYear() + '/' + month + '/' + day;
    return (new Date(standTime)).getTime();
}

function CloseWindow(action) {
    if (action == "close" && form.isChanged()) {
        if (confirm("数据被修改了，是否先保存？")) {
            return false;
        }
    }
    if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
    else window.close();
}
function closeWindow() {
    if (window.CloseOwnerWindow) return window.CloseOwnerWindow();
    else window.close();
}

//严重性和可能性都有了值之后计算风险等级
function CountRiskLevel(possibility, serious) {
    var riskLevel;
    if (parseInt(possibility) == 1 && parseInt(serious) <= 3) {
        riskLevel = 1;
    } else if (parseInt(possibility) == 1 && parseInt(serious) >= 4) {
        riskLevel = 2;
    }
    if (parseInt(possibility) == 2 && parseInt(serious) <= 2) {
        riskLevel = 1;
    } else if (parseInt(possibility) == 2 && parseInt(serious) == 5) {
        riskLevel = 3;
    } else if (parseInt(possibility) == 2 && parseInt(serious) >= 3 && parseInt(serious) <= 4) {
        riskLevel = 2;
    }
    if (parseInt(possibility) == 3 && parseInt(serious) <= 1) {
        riskLevel = 1;

    } else if (parseInt(possibility) == 3 && parseInt(serious) <= 3 && parseInt(serious) >= 2) {
        riskLevel = 2;

    } else if (parseInt(possibility) == 3 && parseInt(serious) == 4) {
        riskLevel = 3;
    } else if (parseInt(possibility) == 3 && parseInt(serious) == 5) {
        riskLevel = 4;
    }
    if (parseInt(possibility) == 4 && parseInt(serious) <= 2) {
        riskLevel = 2;
    } else if (parseInt(possibility) == 4 && (parseInt(serious) == 2 || parseInt(serious) == 3 || parseInt(serious) == 4)) {
        riskLevel = 3;
    } else if (parseInt(possibility) == 4 && parseInt(serious) == 5) {
        riskLevel = 4;
    }
    if (parseInt(possibility) == 5 && parseInt(serious) <= 1) {
        riskLevel = 2;
    } else if (parseInt(possibility) == 5 && parseInt(serious) <= 3 && parseInt(serious) >= 2) {
        riskLevel = 3;
    } else if (parseInt(possibility) == 5 && parseInt(serious) >= 4) {
        riskLevel = 4;
    }

    //计算出风险等级之后更改颜色
    var classArr = target.attr('class').split(' ');
    for (var i = 0; i < classArr.length; i++) {
        if (classArr[i].slice(0, -1) == 'drag-riskLevel') {
            classArr.splice(i, 1);
        }
    }
    classArr.push('drag-riskLevel' + riskLevel);
    target.attr("class", classArr.join(' '));
    mini.get('riskPossShow').setValue(riskLevel);
    mini.get('riskProgressbar').setValue(riskLevel * 25);
}


//TBD，如何动态获取风险源清单Tab页？后台查询？
$('#btnEval').click(function () {

    //标注完毕之后进入风险源清单
    var mainTabs = window.parent.mini.get("safeTabs");
    var node = {
        id: "f24ad9d6a12b4ca397918b762f2edef8",
        text: "风险源清单",
        href: "/comp/risk/riskReport/goList"
    };
    showTab(node, mainTabs);
});

////打开一个Tab页
function showTab(node, tabs) {
    var id = "tab$" + node.id;
    var tab = tabs.getTab(id);
    if (!tab) {
        tab = {};
        tab._nodeid = node.id;
        tab.name = id;
        tab.title = node.text;
        tab.showCloseButton = true;
        tab.url = ctxPrefix + node.href;
        //这里拼接了url，实际项目，应该从后台直接获得完整的url地址
        if (node.href.indexOf('?') > 0) {
            tab.url = ctxPrefix + node.href + '&parent_id=' + node.id;
        } else {
            tab.url = ctxPrefix + node.href + '?parent_id=' + node.id;
        }
        tabs.addTab(tab);
    }

    tabs.reloadTab(tab);
    tabs.activeTab(tab);
}


//复制一个元素的事件
function drag(oDrag) {
    var disX = 0;
    var dixY = 0;
    var zIndex = 10;
    var ele = '';
    var startLeft = '';
    var startTop = '';
    oDrag.onmousedown = function (e) {
        var e = e || window.event;
        var iconTop = $(this).offset().top - $('#canvasShow').offset().top;
        var iconLeft = $(this). offset().left - $('#canvasShow').offset().left;
        startLeft = $(this).offset().left;
        startTop = $(this).offset().top;
        ele = $(this).parent();
        disX = $('#canvasShow').offset().left + (e.offsetX || (e.clientX - srcObj.getBoundingClientRect().left));
        dixY = $('#canvasShow').offset().top + (e.offsetY || (e.clientY - srcObj.getBoundingClientRect().top));
        var oTemp = this.cloneNode(true);

        $(oTemp).css({
            'top': iconTop + 'px',
            'left': iconLeft + 'px',
            'position': 'absolute',
            "width": Math.floor(40 * scalePlateau) + 'px',
            "height": Math.floor(40 * scalePlateau) + 'px'
        });
        $('#canvasShow').append(oTemp);
        document.onmousemove = function (e) {
            var e = e || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY || e.clientY + scrollY;
            var iL = x - disX;
            var iT = y - dixY;
            $(oTemp).css({
                'top': iT + "px",
                'left': iL + "px",
                'zIndex': zIndex++
            });
            return false;
        };
        document.onmouseup = function () {
            $(oTemp).removeClass('rr-drag-icon-org').addClass('drag-mark');
            document.onmousemove = null;
            document.onmouseup = null;
            var oTempTop = parseInt($(oTemp).css('top'));
            var oTempLeft = parseInt($(oTemp).css('left'));
            var maxiL = parseInt($('#canvasShow').css('width'));
            var maxiT = parseInt($('#img').css('height'));
            if (oTempTop < 0 || oTempTop > maxiT || oTempLeft <-11 || oTempLeft > maxiL) {
                document.getElementById('canvasShow').removeChild(oTemp);
                $(oTemp).removeClass('drag-mark').addClass('rr-drag-icon-org');

            }
            if(oTempLeft >= -10  && oTempTop > 0 && oTempTop < maxiT) {
                $(ele).remove()
            }
            oDrag.style.zIndex = oTemp.style.zIndex + 1;
            oDrag.releaseCapture && oDrag.releaseCapture();
            movePointers($(oTemp));
        };
        this.setCapture && this.setCapture();
        return false;
    }

}
//动画效果
function oAnimate(obj, params, time, handler) {
    var node = typeof obj == "string" ? $(obj) : obj;
    var _style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
    var handleFlag = true;
    for (var p in params) {
        (function () {
            var n = p;
            if (n == "left" || n == "top") {
                var _old = parseInt(_style[n]);
                var _new = parseInt(params[n]);
                var _length = 0,
                    _tt = 10;
                if (!isNaN(_old)) {
                    var count = _old;
                    var length = _old <= _new ? (_new - _old) : (_old - _new);
                    var speed = length / time * _tt;
                    var flag = 0;
                    var anim = setInterval(function () {
                        node.style[n] = count + "px";
                        count = _old <= _new ? count + speed : count - speed;
                        flag += _tt;
                        if (flag >= time) {
                            node.style[n] = _new + "px";
                            clearInterval(anim);
                            if (handleFlag) {
                                handler();
                                handleFlag = false;
                            }
                        }
                    }, _tt);
                }
            }
        })();
    }
}
//处理数据并渲染页面
function  updateData(elem,id,name) {
    // var elemName=elem.attr("data-name")
    for(var o = 0; o < elem.length; o++){
        if(id==elem[o].id){
            var baseHtml = '';
            var riskHtml = '';
            var type = elem[o].clazz;
            if(elem[o].info==""){
                baseHtml = "<tr style='color:red'><td>未填写基本信息！</td></tr>"
                $(".form-baseinf-options").html(baseHtml);
                $("#leftbaseForm .form-baseinf-options").html(baseHtml);
                riskHtml +="<tr><td>风险位置：</td><td>"+elem[o].location+"</td></tr><tr><td>风险类别：</td><td>"+elem[o].type+"</td></tr><tr><td>可能性：</td><td>"+elem[o].possibilityText+"</td></tr><tr><td>严重性：</td><td>"+elem[o].seriousText+"</td></tr><tr><td>风险等级：</td><td>"+elem[o].levelText+"</td></tr>";
                $(".form-riskinf-options").html(riskHtml);
                $("#leftriskForm .form-baseinf-options").html(baseHtml);
                return;
            }
            if(typeof elem[o].info == 'string'){
                elem[o].info = JSON.parse(elem[o].info);
            }
            for (var i = 0; i < riskTypesInfo.length; i++) {
                if (riskTypesInfo[i].type == type && elem[o].industry ==riskTypesInfo[i].industry) {
                    var option  = riskTypesInfo[i].options;
                    if (type != 'otherRisk'){
                        for (var j = 0; j < riskSourceTypes.length; j++) {
                            if (type == riskSourceTypes[j].value) {
                                baseData.push({ "text": "风险源名称", "value": riskSourceTypes[j].label, "unit":"" });
                            }
                        }
                    }
                    for (var j = 0; j < option.length; j++) {
                        if (option[j].nature == "" || option[j].nature==undefined) {
                            for (var k in elem[o].info) {
                                if (option[j].name == k) {
                                    baseData.push({ "text": option[j].text, "value": elem[o].info[k], "unit": option[j].unit })
                                }
                            }
                        } else {
                            for (var m = 0; m < option[j].nature.length; m++) {
                                for (var k in elem[o].info) {
                                    if (option[j].name == k && option[j].nature[m].value == elem[o].info[k]) {
                                        baseData.push({ "text": option[j].text, "value": option[j].nature[m].txt, "unit": option[j].unit });
                                    }
                                }
                            }
                        }

                    }
                }
            }
            baseData = [
                {text: '风险源名称', value: '腐蚀性危险化学品', unit: ''},
                {text: '部门', value: '化工部', unit: ''},
                {text: '事故类型', value: '火灾爆炸', unit: ''},
                {text: '可能发生性', value: '3', unit: ''},
                {text: '后果严重性', value: '4', unit: ''},
                {text: '风险值', value: '12', unit: ''},
                {text: '管控等级', value: '二级', unit: ''},
                {text: '管控频次', value: '周', unit: ''},
            ]

            for(var g = 0; g <baseData.length; g++){
                baseHtml+="<tr style='width:100%'><td>"+baseData[g].text+"</td><td>"+baseData[g].value+"<span>"+baseData[g].unit+"</span></td></tr>"
            }
            $(".form-baseinf-options").html(baseHtml);
            $("#leftbaseForm .form-baseinf-options").html(baseHtml);
            riskHtml +="<tr style='width:100%'><td>风险位置：</td><td>"+elem[o].location+"</td></tr><tr><td>风险类别：</td><td>"+elem[o].type+"</td></tr><tr><td>可能性：</td><td>"+elem[o].possibilityText+"</td></tr><tr><td>严重性：</td><td>"+elem[o].seriousText+"</td></tr><tr><td>风险等级：</td><td>"+elem[o].levelText+"</td></tr>";
            $(".form-riskinf-options").html(riskHtml);
            $("#leftriskForm .form-baseinf-options").html(baseHtml);
            baseData=[];
        }
    }

}
//全部复位
function reset(){
    var iconArr = $("#canvasShow").find('i.rr-drag-icon');
    if(iconArr.length != 0 || riskTypesOnImage.length != 0){
        window.location.reload();
        // $.getJSON('data.json', null, function () {
        //
        // });
        // $.ajax({
        //     type:"post",
        //     url:ctxFront+'/risk/riskReport/resetAllRiskSource',
        //     data:{data:imageId},
        //     success:function(data){
        //         if(data == 'success'){
        //             mini.alert("复位成功！","",function(action){
        //                 if(action == 'ok' || action == 'close'){
        //                     window.location.reload();
        //                 }
        //             });
        //             $(".mini-messagebox .mini-messagebox-content td").css({
        //                 'font-size': '14px',
        //                 'font-family': '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
        //                 'padding': '8px 0',
        //                 'color': '#666666'
        //             });
        //             $(".mini-messagebox .mini-messagebox-table").css({'margin-top': '72px'});
        //             $(".mini-messagebox-content").addClass("change");
        //             $(".mini-messagebox .mini-messagebox-table td:first").hide()
        //
        //         }else {
        //             mini.alert("重置失败！");
        //             $(".mini-messagebox .mini-messagebox-content td").css({
        //                 'font-size': '14px',
        //                 'font-family': '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
        //                 'padding': '8px 0',
        //                 'color': '#666666'
        //             });
        //             $(".mini-messagebox .mini-messagebox-table").css({'margin-top': '72px'});
        //             $(".mini-messagebox .mini-messagebox-table td:first").hide()
        //         }
        //     }
        // })
    }else{
        alert("底图无风险源，无需复位！")
        $(".mini-messagebox .mini-messagebox-content td").css({
            'font-size': '14px',
            'font-family': '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
            'padding': '8px 0',
            'color': '#666666'
        });
        $(".mini-messagebox .mini-messagebox-table").css({'margin-top': '72px'});
        $(".mini-messagebox .mini-messagebox-table td:first").hide()
    }

}
