﻿$(function() {
    var getorder_base_YSFS = [
        "监管仓库",
        "水路运输",
        "铁路运输",
        "公路运输"
    ];
    var getorder_base_CYKA = [ 
		{ label: "AAA,老虎", value: "AAA" },
		{ label: "BBB,打老虎", value: "BBB" },
		{ label: "CCC,今夜打老虎", value: "CCC" },
	]
	var getorder_base_BGBB = [
		"USA",
		"RMB",
		"EUR",
		"GBP",
		"HKD",
		"CHF",
		"DEM",
		"FRF",
		"SGD",
		"NLG",
		"BEF",
		"ITL",
		"JPY",
		"CAD",
		"AUD",
		"ESP",
		"FIM",
		"NZD",
		"ATS",
		"NOK",
		"THB",
		"DKK",
		"PHP",
		"SEK",
		"MOP"
	]
	var getorder_base_JGTK = [
		"FOB",
		"CIF",
		"CFR",
		"CNF",
		"CPT",
		"CIP",
		"C&F",
		"FCA",
		"EXW"
	]

    $( 'input[name="getorder_base_YSFS"]').autocomplete({
        source: getorder_base_YSFS,
        minLength:0
    });
    $( 'input[name="getorder_base_CYKA"]').autocomplete({
        source: getorder_base_CYKA,
        minLength:0
    });
	$( 'input[name="getorder_base_BGBB"]').autocomplete({
        source: getorder_base_BGBB,
        minLength:0
    });
	$( 'input[name="getorder_base_JGTK"]').autocomplete({
        source: getorder_base_JGTK,
        minLength:0
    });
	$('.money_getorder').off('click','input[name="goods_item_HS"]').on('mousedown',function(){
		$( 'input[name="goods_item_HS"]').autocomplete({
			source:  [
			{ label: "9403509990,木床", value: "9403509990" ,goods_item_CN :"木床" ,goods_item_EN :"ADW",goods_item_PP : "阿迪王",goods_item_YCG : "美帝"},
			{ label: "9403609990,木柜", value: "9403609990" ,goods_item_CN :"木柜" ,goods_item_EN :"MG"},
			{ label: "1234567890,有毒", value: "1234567890" ,goods_item_CN :"测试有毒" ,goods_item_EN :"succeed"}
		],
			minLength:0,
			select: function( event, ui ) {
				$(this).val( ui.item.value );
				var goods_item = $(this).parents('.money_getorder_goods_item');
				goods_item.find( 'input[name="goods_item_CN"]').val( ui.item.goods_item_CN );
				goods_item.find( 'input[name="goods_item_EN"]').val( ui.item.goods_item_EN );
				goods_item.find( 'input[name="goods_item_PP"]').val( ui.item.goods_item_PP );
				goods_item.find( 'input[name="goods_item_YCG"]').val( ui.item.goods_item_YCG );
				var index = $(this).parents('.money_getorder_goods_content').index()-1;
				$('.getorder_bggoods_HS').eq(index).text( ui.item.value );
				$('.getorder_bggoods_type_item').eq(index).text( ui.item.goods_item_CN );

				return false;
			}
		});
		// HS自动补全
		$('input[name="goods_item_HS"]').off('click','.money_getorder').on('click',function(){
			$(this).removeClass('danger');
			$(this).autocomplete( "search", "" );
		})
	})
	// 下单页  其他自动补全
	$('input[name="getorder_base_YSFS"]').add($('input[name="getorder_base_CYKA"]')).add($('input[name="getorder_base_BGBB"]')).add($('input[name="getorder_base_JGTK"]')).on('click',function(){
		$(this).autocomplete( "search", "" );
	});
});