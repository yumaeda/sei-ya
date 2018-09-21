//-------------------------------------------------------
//
// ImageSlide
//
//-------------------------------------------- YuMaeda --
class ImageSlide
{
    constructor($parentContainer)
    {
        this.$m_parentContainer = $parentContainer;
        this.m_iFirstImage      = 0;
        this.m_intTimerInterval = 5000;
        this.m_rgobjAd          = [];
        this.m_strImageCssName  = 'image--action-advertise';
    }

    _generateAdHtml(objAd)
    {
        var html = '';

        if (objAd)
        {
            html +=
                '<a href="' + objAd.url + '">' +
                    '<img src={0} class="{1}" />'.format(objAd.img, this.m_strImageCssName) +
                '</a>';
        }

        return html;
    },

    _render()
    {
        if (this.$m_parentContainer && (this.$m_parentContainer.length == 1))
        {
            var html     = '',
                tmpAd    = null,
                cImg     = ImageSlide.rgobjAd.length,
                iCurImg  = ImageSlide._iFirstImg;

            for (var i = 0; i < cImg; ++i)
            {
                iCurImg = iCurImg % cImg;
                tmpAd   = this.m_rgobjAd[iCurImg];
                html   += this._generateAdHtml(tmpAd);

                ++iCurImg;
            }

            this.$m_parentContainer.html(html);
            this.m_iFirstImg = (this.m_iFirstImg + 1) % this.m_rgobjAd.length;
        }

        $('img.{0}'.format(this.m_strImageCssName)).animate({ left: '-=294' }, this.m_intTimerInterval, 'linear', function(){});
    },

    addAdvertisement(strImageUrl, strUrl)
    {
        this.m_rgobjAd.push({ img: strImageUrl, url: strUrl, text: '' });
    }

    start()
    {
        return setInterval(this._render, this.m_intTimerInterval);
    }
}

