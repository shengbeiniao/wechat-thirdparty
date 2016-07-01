<xml>
    <ToUserName><![CDATA[{{ToUserName}}]]></ToUserName>
    <FromUserName><![CDATA[{{FromUserName}}]]></FromUserName>
    <CreateTime>{{CreateTime}}</CreateTime>
    <MsgType><![CDATA[{{MsgType}}]]></MsgType>
    {% if MsgType==='text' %}
    <Content><![CDATA[{{Content}}]]></Content>
    {% endif %}

    {% if MsgType==='image' %}
    <Image>
        <MediaId><![CDATA[{{MediaId}}]]></MediaId>
    </Image>
    {% endif %}

    {% if MsgType==='voice' %}
    <Voice>
        <MediaId><![CDATA[{{MediaId}}]]></MediaId>
    </Voice>
    {% endif %}

    {% if MsgType==='video' %}
    <Video>
        <MediaId><![CDATA[{{MediaId}}]]></MediaId>
        <Title><![CDATA[{{Title}}]]></Title>
        <Description><![CDATA[{{Description}}]]></Description>
    </Video>
    {% endif %}

    {% if MsgType==='music' %}
    <Music>
        <Title><![CDATA[{{Title}}]]></Title>
        <Description><![CDATA[{{Description}}]]></Description>
        <MusicUrl><![CDATA[{{Url}}]]></MusicUrl>
        <HQMusicUrl><![CDATA[{{HQUrl}}]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[{{MediaId}}]]></ThumbMediaId>
    </Music>
    {% endif %}

    {% if MsgType==='news' %}
    <ArticleCount>{{Count}}</ArticleCount>
    <Articles>
        {% for article in Articles %}
            <item>
                <Title><![CDATA[{{article.title}}]]></Title>
                <Description><![CDATA[{{article.description}}]]></Description>
                <PicUrl><![CDATA[{{article.picUrl}}]]></PicUrl>
                <Url><![CDATA[{{article.url}}]]></Url>
            </item>
        {% endfor %}
    </Articles>
    {% endif %}
</xml>
