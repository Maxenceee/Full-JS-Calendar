this.ref_ = {
    // Demo data
    data: [{"dayid":0,"dayc":[{"id":0,"start":"1000","end":"1755","txt":1,"isAvailable":1},{"id":1,"start":"0930","end":"1015","txt":1,"isAvailable":1},{"id":2,"start":"1300","end":"1350","txt":0,"isAvailable":1,"level":0,"age":1},{"id":3,"start":"1500","end":"1645","txt":0,"isAvailable":1,"level":null,"age":null}]},{"dayid":1,"dayc":[]},{"dayid":2,"dayc":[{"id":1,"start":"1230","end":"1500","txt":0,"isAvailable":0,"level":2,"age":2},{"id":2,"start":"0910","end":"1040","txt":0,"isAvailable":1,"level":null,"age":null}]},{"dayid":3,"dayc":[{"id":0,"start":"0900","end":"0940","txt":0,"isAvailable":1,"level":0,"age":0},{"id":1,"start":"1315","end":"1445","txt":1,"isAvailable":1}]},{"dayid":4,"dayc":[{"id":0,"start":"1110","end":"1240","txt":0,"isAvailable":1,"level":1,"age":2}]},{"dayid":5,"dayc":[{"id":0,"start":"0900","end":"1000","txt":1,"isAvailable":1},{"id":1,"start":"1300","end":"1430","txt":0,"isAvailable":1,"level":null,"age":2},{"id":2,"start":"1100","end":"1230","txt":0,"isAvailable":1,"level":null,"age":null}]},{"dayid":6,"dayc":[{"id":1,"start":"1330","end":"1510","txt":1,"isAvailable":1},{"id":2,"start":"1230","end":"1330","txt":1,"isAvailable":1}]}]
}

this.ref_ = this.ref_ || {}
console.log(this.ref_);
(function(_) {
    try {
        var that = this;
        _.hidePanel = (panel) => {
            _.html.classList.remove('menu-open');
            panel.classList.add('-unactive');
            
            setTimeout(() => { panel.classList.remove('-unactive'); this.root.removeChild(panel);}, 300);
        }
        
        _.showPanel = (panel) => {
            _.html.classList.add('menu-open');
            this.root.classList.add('-active-panel');
            
            this.root.appendChild(panel);
            !document.body.classList.contains('--burger') || document.querySelectorAll('.pnc-cs-clk').forEach(e => { e.onclick = () => { _.hide(panel) }});
        }
        
        _.scrollShadow = (e, l) => {
            e.onscroll = () => {
                if (e.scrollHeight-e.clientHeight <= e.scrollTop) {
                    l.classList.remove('scroll-shadow-mdl');
                    l.classList.add('scroll-shadow-top');
                } else if (0 >= e.scrollTop) {
                    l.classList.remove('scroll-shadow-mdl');
                    l.classList.add('scroll-shadow-btm');
                } else {
                    l.classList.remove('scroll-shadow-top');
                    l.classList.remove('scroll-shadow-btm');
                    l.classList.add('scroll-shadow-mdl');
                }
            }
        }
        
        _.fhover = (u, e, i) => {
            console.log(parseInt(u.getAttribute('rdv-el-lvl'))+1, this.levels, parseInt(u.getAttribute('rdv-el-age'))+1 || 0, this.ages);
            return '<div class="cal-hover-el-c-b-c"><h1 class="cal-tp-day-tt" style="color: '+ this.colorsTheme[parseInt(u.getAttribute("txt-type"))][0] +' !important;">'+ this.courses[parseInt(u.getAttribute("txt-type"))] +'</h1><div>'+ (Boolean(!parseInt(u.getAttribute('el-disp'))) ? '<h2 style="color: #E64826;">Actuellement indisponible</h2>' : '<h2 style="color: #18BEC9;">Actuellement disponible</h2>') +'<h3>'+'<span>Début : </span>'+ u.getAttribute("rdv-el-s").slice(0,2) + ':' + u.getAttribute("rdv-el-s").slice(2) + '</h3><h3>'+'<span>Fin : </span>'+ u.getAttribute("rdv-el-e").slice(0,2) + ':' + u.getAttribute("rdv-el-e").slice(2) +'</h3><h3><span>Durée : </span>'+ (e >= 1 ? (e +'h'+ (i ? i : '')) : (i + 'mins')) +'</h3><h3><span>Niveau : </span>'+ (this.levels[parseInt(u.getAttribute('rdv-el-lvl'))+1 || 0]) + '</h3><h3><span>Age : </span>'+ (this.ages[parseInt(u.getAttribute('rdv-el-age'))+1 || 0]) + '</h3></div></div>';
        }
        
        _.jhover = (u) => {
            let rt = '<div class="cal-hover-el-c-t-c"><div><svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M1350 5104 c-101 -27 -188 -100 -238 -199 -27 -55 -42 -141 -42 -245 l0 -87 -150 -6 c-130 -5 -162 -10 -233 -35 -149 -51 -268 -152 -340 -289 -55 -105 -67 -170 -67 -375 l0 -178 2280 0 2280 0 0 175 c0 204 -8 251 -62 365 -32 68 -56 100 -117 160 -123 122 -233 165 -448 176 l-123 7 0 107 c0 121 -16 191 -62 262 -61 96 -143 150 -256 170 -157 27 -314 -57 -390 -207 -27 -55 -42 -141 -42 -247 l0 -88 -189 0 -188 0 -6 118 c-7 140 -24 200 -77 274 -165 231 -510 197 -634 -62 -29 -61 -31 -73 -34 -197 l-4 -133 -194 0 -194 0 0 108 c0 123 -16 192 -62 264 -56 89 -136 146 -236 167 -68 14 -104 13 -172 -5z m153 -208 c39 -16 82 -61 96 -99 7 -18 11 -164 11 -408 0 -419 0 -421 -63 -476 -84 -74 -200 -45 -248 62 -17 36 -19 73 -19 413 0 314 2 378 15 410 39 93 125 134 208 98z m1173 -21 c69 -52 69 -55 69 -485 0 -430 0 -433 -69 -485 -76 -58 -186 -34 -233 50 -22 39 -23 45 -23 431 0 388 0 391 23 435 46 88 155 113 233 54z m1097 21 c39 -16 82 -61 96 -99 7 -18 11 -164 11 -408 0 -419 0 -421 -63 -476 -84 -74 -200 -45 -248 62 -17 36 -19 73 -19 413 0 314 2 378 15 410 39 93 125 134 208 98z"/><path d="M282 1943 l3 -1478 21 -56 c63 -163 163 -275 312 -349 127 -63 30 -60 1942 -60 1465 0 1756 3 1812 14 131 28 264 113 344 220 61 80 81 122 105 213 18 74 19 124 19 1525 l0 1448 -175 0 -175 0 0 -1437 0 -1438 -24 -51 c-13 -28 -41 -65 -62 -82 -79 -66 34 -62 -1844 -62 -1884 0 -1771 -4 -1847 63 -20 17 -47 54 -59 82 l-24 50 0 1438 0 1437 -175 0 -175 0 2 -1477z"/><path d="M1810 2780 l0 -290 320 0 320 0 0 290 0 290 -320 0 -320 0 0 -290z"/><path d="M2670 2780 l0 -290 320 0 320 0 0 290 0 290 -320 0 -320 0 0 -290z"/><path d="M3530 2780 l0 -290 323 2 322 3 0 285 0 285 -322 3 -323 2 0 -290z"/><path d="M945 2287 c-3 -7 -4 -136 -3 -287 l3 -275 323 -3 322 -2 0 290 0 290 -320 0 c-249 0 -322 -3 -325 -13z"/><path d="M1810 2010 l0 -290 320 0 320 0 0 290 0 290 -320 0 -320 0 0 -290z"/><path d="M2670 2010 l0 -290 320 0 320 0 0 290 0 290 -320 0 -320 0 0 -290z"/><path d="M3530 2010 l0 -290 323 2 322 3 0 285 0 285 -322 3 -323 2 0 -290z"/><path d="M940 1245 l0 -285 325 0 325 0 0 285 0 285 -325 0 -325 0 0 -285z"/><path d="M1810 1245 l0 -285 320 0 320 0 0 285 0 285 -320 0 -320 0 0 -285z"/><path d="M2670 1245 l0 -285 320 0 320 0 0 285 0 285 -320 0 -320 0 0 -285z"/><path d="M3530 1245 l0 -285 325 0 325 0 0 285 0 285 -325 0 -325 0 0 -285z"/></g></svg></div><h4>'+ u.getAttribute('el-date') + '-'+ (parseInt(u.getAttribute('el-date')) < this.today.getDate() ? this.today.getMonth()+2 : this.today.getMonth()+1) + '</h4></div>';
            return rt
        }
        
        _.pihover = (u, j, f, d) => {
            let sh = parseInt(u.getAttribute("rdv-el-s").slice(0,2))*60,
                sm = parseInt(u.getAttribute("rdv-el-s").slice(2)),
                eh = parseInt(u.getAttribute("rdv-el-e").slice(0,2))*60,
                em = parseInt(u.getAttribute("rdv-el-e").slice(2)),
                timeSE = (eh + em) - (sh + sm),
                elmDH = Math.floor(timeSE/60),
                elmDM = timeSE%60;
            j.innerHTML = _.jhover(u);
            f.innerHTML = _.fhover(u, elmDH, elmDM);
            d && this.rootPop.appendChild(d);
        }
        
        _.mobFpopup = (content) => {
            document.querySelectorAll('[day-event]').forEach((u, i) => {
                u.onclick = (e) => {
                    if (parseInt(u.getAttribute("gridIndex")) == _.selectedIndexGrid && !this.rootPop.classList.contains('-pop-active')) {
                        x(u)
                    }
                }
            });
            const x = (u) => {
                let a = document.createElement("div"),
                    b = document.createElement("div"),
                    c = document.createElement("div");
                a.setAttribute("class", "cal-mob-pop-root-c");
                b.setAttribute("class", "cal-mob-pop-box-cnt");
                c.setAttribute("class", "cal-mob-pop-close");
                c.setAttribute("id", "cal-mob-pop-close-btn");
                a.onclick = (e) => {
                    if (e.target === c || e.target === a) {
                        this.rootPop.classList.remove("-pop-active");
                        this.rootPop.removeChild(a);
                    }
                }
                a.appendChild(b);
                let e = document.createElement("div"),
                    f = document.createElement("div"),
                    j = document.createElement("div");
                e.setAttribute("class", "cal-hover-el-c");
                j.setAttribute("class", "cal-hover-el-c-t");
                f.setAttribute("class", "cal-hover-el-c-b");
                e.appendChild(j);
                e.appendChild(f);
                b.appendChild(c);
                b.appendChild(e);
                this.rootPop.classList.add("-pop-active");
                _.pihover(u, j, f);
                this.rootPop.appendChild(a);
            }
        }
        
        _.deskFpopup = (content) => {
            let d = document.createElement("div"),
                e = document.createElement("div"),
                f = document.createElement("div"),
                j = document.createElement("div");
            d.setAttribute("class", "cal-hover-el");
            e.setAttribute("class", "cal-hover-el-c");
            j.setAttribute("class", "cal-hover-el-c-t");
            f.setAttribute("class", "cal-hover-el-c-b");
            e.appendChild(j);
            e.appendChild(f);
            d.appendChild(e);
            const x = (e, y, u) => {
                let i = d.getBoundingClientRect(),
                    o = this.root.getBoundingClientRect(),
                    l = _.desktop() ? e.clientX < o.left + o.width - (i.width + 10) ? 10 : - (i.width) : e.clientX < o.left + o.width/2 ? 10 : - (i.width),
                    m = e.clientY < o.top + o.height - (i.height + 10) ? 10 : - (i.height);

                if (!y) d.style.transform = 'translate('+ (e.clientX + l) +'px, '+ (e.clientY + m) +'px)';
                else d.style.transform = 'translate('+ (e.clientX + l) +'px, '+ (e.clientY + m) +'px)';
            }
            window.addEventListener('resize', () => {
                d.parentElement.removeChild(d);
                document.removeEventListener('mousemove', x);
            });
            document.querySelectorAll('[day-event]').forEach((u, i) => {
                if (_.desktop()) {
                    // console.log(u, i);
                    u.onmouseenter = () => {
                        // console.log('enter');
                        _.pihover(u, j, f, d);
                        document.addEventListener('mousemove', x);
                    }
                    u.onmouseleave = () => {
                        // console.log('leave', i);
                        d.parentElement.removeChild(d);
                        document.removeEventListener('mousemove', x);
                    }
                } else {
                    // _.htargets.push(u);
                    // u.onclick = (e) => {
                    //     if (parseInt(u.getAttribute("gridIndex")) == _.selectedIndexGrid) {
                    //         _.pihover(u, j, f, d);
                    //         x(e, true, u);
                    //     }
                    // }
                    // window.onclick = (e) => {
                    //     // console.log("e", e.target, "u", u);
                    //     const p = (i) => {
                    //         return !i.contains(e.target);
                    //     }
                    //     if (_.htargets.every(p)) d.parentElement.removeChild(d);
                    // }
                }
            });
        }
        
        _.addRElement = (root, e, dates, index) => {
            if (e.dayc.length > 0) {
                e.dayc = e.dayc.sort(function(a, b) { 
                    return a.start - b.start;
                });
                let idx = _.getElementsIndex(e.dayc);
                e.dayc.forEach((u, a) => {
                    let idxel = idx[a];
                    var n = document.createElement("div"),
                        m = document.createElement("div"),
                        o = document.createElement("div"),
                        l = (this.root.getBoundingClientRect().width / 7),
                        t = this.uniHeight,
                        rowPlacement = a,
                        topPlacement = parseInt(u.start.slice(0, 2)) - 7,
                        // startOff = ((root.getBoundingClientRect().width / 7) / _.aspect()) / 60 * (parseInt(u.start.slice(2))),
                        startOff = (this.uniHeight / 60 * parseInt(u.start.slice(2))),
                        lengthrdv = ((parseInt(u.end.slice(0, 2))) - (parseInt(u.start.slice(0, 2))) - (parseInt(u.start.slice(2)) / 60 * 1) + (parseInt(u.end.slice(2)) / 60 * 1));
                    n.setAttribute("class", "cal-grid-rdv-el");
                    m.setAttribute("class", "cal-grid-rdv-el-in");
                    o.innerHTML = '<h3 class="cal-r-tt">'+ this.courses[u.txt] +'</h3>'
                    let w = document.createElement("div");
                    if (_.desktop() && lengthrdv >= 1) {
                        if (u.age !== undefined) {
                            n.setAttribute("rdv-el-age", u.age);
                            let aget = document.createElement('h3');
                            aget.innerText = this.ages[u.age+1];
                            w.appendChild(aget);
                        }
                        if (u.level !== undefined) {
                            n.setAttribute("rdv-el-lvl", u.level);
                            let lvlt = document.createElement('h3');
                            lvlt.innerText = this.levels[u.level+1];
                            w.appendChild(lvlt);
                        }
                        o.appendChild(w);
                    } else if (_.desktop() && lengthrdv < 1) {
                        u.age !== undefined && n.setAttribute("rdv-el-age", u.age);
                        u.level !== undefined && n.setAttribute("rdv-el-lvl", u.level);
                        let v = document.createElement("h4");
                        lengthrdv > 0.7 ? v.innerHTML = "..." : o.querySelector('h3').innerText += "...";
                        o.appendChild(v);
                    } else {
                        w.setAttribute("class", "cal-el-r-mob-info");
                        w.innerHTML = '<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 128 128" width="512px" height="512px"><path d="M 64 6 C 32 6 6 32 6 64 C 6 96 32 122 64 122 C 96 122 122 96 122 64 C 122 32 96 6 64 6 z M 64 12 C 92.7 12 116 35.3 116 64 C 116 92.7 92.7 116 64 116 C 35.3 116 12 92.7 12 64 C 12 35.3 35.3 12 64 12 z M 64 30 A 9 9 0 0 0 64 48 A 9 9 0 0 0 64 30 z M 64 59 C 59 59 55 63 55 68 L 55 92 C 55 97 59 101 64 101 C 69 101 73 97 73 92 L 73 68 C 73 63 69 59 64 59 z"/></svg>'
                        n.appendChild(w);
                    }
                    o.innerHTML += '<h4 class="cal-r-date">'+ u.start.slice(0, 2)+":"+u.start.slice(2) + " - " + u.end.slice(0, 2)+":"+u.end.slice(2) +'</h4>'
                    n.setAttribute("el-date", dates);
                    n.setAttribute("rdv-id", u.id);
                    n.setAttribute("txt-type", u.txt);
                    n.setAttribute("day-el", e.dayid);
                    n.setAttribute("rdv-el-s", u.start);
                    n.setAttribute("rdv-el-e", u.end);
                    n.setAttribute("day-event", "");
                    n.setAttribute("gridIndex", index);
                    n.style.setProperty("--major-border-color", this.colorsTheme[u.txt][0]);
                    n.style.setProperty("--major-backgrounColor", this.colorsTheme[u.txt][1]);
                    n.style.position = "absolute";
                    n.style.height = (t * (lengthrdv >= 0.5 ? lengthrdv : 0.5)) + "px";
                    n.style.top = (t * topPlacement + startOff)-1 + "px";
                    n.style.width = "calc("+ (idxel.size) +"% - 0px)";
                    n.style.left = idxel.offset+"%";
        
                    if (!Boolean(u.isAvailable) || (!_.nextWeek && (_.td > e.dayid || ((_.td == e.dayid && parseInt(u.end.slice(0, 2)) < this.today.getHours()) || (_.td == e.dayid && parseInt(u.end.slice(0, 2)) == this.today.getHours() && parseInt(u.end.slice(2)) < this.today.getMinutes()))))) {
                        n.style.opacity = "0.5";
                        n.classList.add("r-unvailable");
                        n.setAttribute("el-disp", 0);
                    } else {
                        n.setAttribute("el-disp", 1);
                    }
        
                    m.appendChild(o);
                    n.appendChild(m);
                    root.appendChild(n);
                    n.onmouseover = () => {
                        root.classList.add("cal-grid-el-over");
                        n.classList.add("cal-grid-el-overed");
                    }
                    n.onmouseout = () => {
                        root.classList.remove("cal-grid-el-over");
                        n.classList.remove("cal-grid-el-overed");
                    }
                });
            }
        }
        
        _.gridB = (content, dates) => {
            let a = document.createElement("div"),
                b = document.createElement("div"),
                c = document.createElement("div"),
                l = document.createElement("div"),
                r = document.createElement("div"),
                s = document.createElement("div"),
                st = 8,
                duration = 12,
                days = 7;
        
            a.setAttribute("class", "cal-grid-bd");
            b.setAttribute("class", "cal-grid-bd-c");
            a.classList.add('scroll-shadow-btm');
            c.setAttribute("class", "cal-grid-bd-cp");
            l.setAttribute("class", "cal-grid-lp");
            r.setAttribute("class", "cal-grid-rp");
            s.setAttribute("class", "cal-grid-rp-c");
        
            for(var x = 0; x < duration; x++) {
                let dn = document.createElement("div"),
                    dt = document.createElement("p");
                
                dn.setAttribute("class", "cal-grid-dn");
                dt.setAttribute("class", "cal-grid-dn-t");
                if (x > 0) {
                    dt.innerText = (st+x-1 >= 10 ? st+x-1 : '0'+(st+x-1)) + ":00";
                    dn.appendChild(dt);
                }
                dn.style.height = this.uniHeight+"px";
                l.appendChild(dn);
            }
        
            for(var y = 0; y < days; y++) {
                let d = document.createElement("div"),
                    un = document.createElement("div");
                d.setAttribute("class", "cal-grid-el-pr");
                d.setAttribute("cal-line-index", y);
                un.setAttribute("class", "cal-line-r-c");
                for(var x = 0; x < duration; x++) {
                    let dy = document.createElement("div");
                    dy.setAttribute("class", "cal-grid-el-in");
                    dy.setAttribute("cal-col-index", x);
                    if (x == duration-1) dy.setAttribute("cal-col-last", "");
                    dy.style.setProperty("--cal-el-uniheight", this.uniHeight+"px");
                    d.appendChild(dy);
                }
                _.addRElement(un, content[y], dates[y], y);
                d.appendChild(un);
                s.appendChild(d);
            }
        
            r.appendChild(s);
            c.appendChild(l);
            c.appendChild(r);
            b.appendChild(c);
            a.appendChild(b);
            this.root.appendChild(a);
        
            _.scrollShadow(b, a);
        
            _.initMobileGrid();
            _.desktop() ? _.deskFpopup() : _.mobFpopup();
        }
        
        _.gridDays = (content) => {
            // console.log(this.today);
            // this.today = new Date("2022-05-09");
        
            _.td = this.today.getDay()-1;
            if (_.td < 0) {
                _.td = 6;
            }
            let a = document.createElement("div"),
                c = document.createElement("div"),
                u = document.createElement("div"),
                w = _.weekDays();
            let i = document.createElement("div");
            a.classList.add('cal-top');
            c.classList.add('cal-tp-c');
            u.classList.add('cal-tp-br');
        
            i.setAttribute("class", "cal-root-mob-pop");
            this.root.appendChild(i);
            this.rootPop = i;
            for(var x = 0; x < 7; x++) {
                var b = document.createElement("div"),
                    d = document.createElement("div");
                b.setAttribute("day", x);
                b.setAttribute("class", "cal-tp-day");
                if (_.td == x && !_.nextWeek) b.classList.add('cal-curr-day')
                d.setAttribute('class', 'cal-tpd-c');
                d.innerHTML = '<h3 class="cal-tp-day-tt">'+this.langDay[x]+'</h3><h2 class="cal-tp-day-nb">'+w[x]+'</h2>';
                b.appendChild(d);
                c.appendChild(b);
            }
            if (!_.desktop()) {
                let n = document.createElement("div"),
                    m = document.createElement("div");
                n.setAttribute("class", "cal-tp-mob-day-btn cal-btn-left");
                a.appendChild(n);
                m.setAttribute("class", "cal-tp-mob-day-btn cal-btn-right");
                a.appendChild(m);
                [n,m].forEach((e,i) => {
                    e.onclick = () => {
                        _.mobSlidingDay(i)
                    }
                });
            }
            a.appendChild(u);
            a.appendChild(c);
            this.root.appendChild(a);
            _.gridB(content, w, b)
        }
        
        _.weekDays = () => {
            let weekD = [];
        
            if (this.today.getDay() == 0 && this.today.getHours() < 17) {
                for(var i = 6; i >= 0; i--) {
                    let b = this.today.getDate() - i
                    if (b <= 0) {
                        let u = this.today.getMonth();
                        if (u == 0) u = 11
                        b = this.days_of_month[u] + b;
                    }
                    weekD.push(b);
                }
            } else {
                if (this.today.getDay() == 0 && this.today.getHours() > 16 && this.today.getMinutes() >= 0) {
                    _.nextWeek = true
                }
                for(var i = 0; i < 7; i++) {
                    var b = (this.today.getDate() - this.today.getDay()+1 + i)
        
                    if (this.today.getMonth() <= 1 && b <= 0) {
                        b = (this.days_of_month[11] - this.today.getDay() + i + 2)
                    } else if (b > this.days_of_month[this.today.getMonth()] && this.today.getMonth() < 11) {
                        b -= this.days_of_month[this.today.getMonth()];
                    } else if (b <= 0) {
                        b = this.days_of_month[this.today.getMonth()-1] + b;
                    } else if (b > this.days_of_month[this.today.getMonth()] && this.today.getMonth() >= 11) {
                        b = i - _.td + this.today.getDate() - this.days_of_month[this.today.getMonth()] + (_.nextWeek ? 7 : 0);
                    }
                    weekD.push(b);
                }
            }
            return weekD
        }
        
        _.mobSlidingDay = (btn) => {
            let index = parseInt(document.querySelector(".cal-tp-day.selected-day").getAttribute("day")) + (btn === 0 ? -1 : 1);
            _.gridGrow("cal-tp-day", "cal-grid-el-pr", index);
        }
        
        _.initMobileGrid = () => {
            if (!_.desktop()) {
                _.gridGrow("cal-tp-day", "cal-grid-el-pr", _.td);
            } else {
                document.querySelectorAll(".cal-tp-day-tt").forEach((e, u) => {
                    e.innerHTML = this.lang_sel(this.daysName, this.currLang)[u]
                });
            }
        }
        
        _.gridGrow = (r, d, i) => {
            if (i > 6 || i < 0) return
            _.selectedIndexGrid = i
            document.querySelectorAll(".cal-tp-day-tt").forEach((e, u) => {
                e.innerHTML = u == i ? this.lang_sel(this.daysName, this.currLang)[u] : this.lang_sel(this.daysNameShort, this.currLang)[u];
            });
            let a = document.getElementsByClassName(r),
                b = document.getElementsByClassName(d);
            [].forEach.call(a, function(el) {
                el.classList.remove('selected-day');
            });
            a[i].classList.add('selected-day');
            [].forEach.call(b, function(el) {
                el.classList.remove('selected-day');
            });
            b[i].classList.add('selected-day');
            document.querySelector(".cal-tp-mob-day-btn.cal-btn-left").setAttribute("curr-sel", i);
            document.querySelector(".cal-tp-mob-day-btn.cal-btn-right").setAttribute("curr-sel", i);
        }
        
        _.stringToTimeMin = (a) => {
            if (typeof a === 'number') return a
            var b = parseInt(a.slice(0, 2)) * 60,
                c = parseInt(a.slice(2));
            return b+c
        }
        
        _.getElementsIndex = (a) => {
        
            var b = [],
                res = {};
        
            if (a.length <= 1) {
                return [{index: 0, size: 100, offset: 0, object: a[0]}]
            }
            a.forEach((e, i) => {
                let st = _.stringToTimeMin(e.start),
                    ed = _.stringToTimeMin(e.end),
                    size = 0,
                    offset;
        
                if (i == 0) {
                    if (i+1 <= a.length-1) {
                        let nxst = _.stringToTimeMin(a[i+1].start);
                        // console.log(nxst, st, ed);
        
                        if (nxst >= st && nxst <= ed) {
                            size = 90
                            offset = 0;
                        } else {
                            size = 100
                            offset = 0;
                        }
                    }
                } else {
                    for (var el = i-1; el >= 0; el--) {
                        let nxst = _.stringToTimeMin(a[el].start),
                            nxed = _.stringToTimeMin(a[el].end),
                            st =  _.stringToTimeMin(e.start),
                            ed =  _.stringToTimeMin(e.end);
                        if (nxed - nxst < 60) nxed = nxst + 60;
                        
                        if (el-1 >= 0 && nxst <= st && nxed >= ed && b[el].size < 100 && b[el].offset == 0) {
                            size = 80
                            offset = 20;
                            break;
                        } else if (nxst <= st && nxed >= ed) {
                            size = 90
                            offset = 0;
                            break;
                        } else if (nxed >= ed || nxst <= ed && nxed > st || nxed > st) {
                            size = 80
                            offset = 20;
                            if (b[el].offset > 0) {
                                size -= 10;
                                offset += 10;
                            }
                            break;
                        } else if (0 == size) {
                            size = 100
                            offset = 0;
                        }
                    }
                }
        
                res = {index: i, size: size, offset: offset, object: e};
                b.push(res);
            });
            return b
        }
        
        _.resizeGrid = () => {
            this.langDay = this.lang_sel(_.desktop() ? this.daysName : this.daysNameShort, this.currLang);
            _.standardViewportWidth = window.innerWidth
            window.addEventListener('resize', () => {
                if (_.standardViewportWidth !== window.innerWidth) {
                    if (_.desktop()) this.uniHeight = 100;
                    else this.uniHeight = 50;
                    this.root.innerHTML = "";
                    _.gridDays(this.content);
                    _.initMobileGrid();
                    _.standardViewportWidth = window.innerWidth
                }
            });
        }
        
        _.getFebDays = (year) => {
            return _.isLeapYear(year) ? 29 : 28
        }
        
        _.isLeapYear = (year) => {
            return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
        }
        
        _.aspect = () => {
            return _.desktop() ? window.innerWidth < 900 ? 0.9 : 1.3 : 0.5
        }
        
        _.desktop = () => {
            return window.innerWidth > 600
        }
        
        _.dataErrorHandler = () => {
            let errorP = document.createElement('h1');
            errorP.classList.add('error-handl');
            errorP.innerHTML = this.lang_sel(this.error, this.currLang);
            // setTimeout(() => {_.alert(this.lang_sel(this.error, this.currLang))}, 1000);
        
            this.root.innerHTML = "";
            this.root.appendChild(errorP);
        }
        
        _.getElements = () => {
            /*
             *
             *  To get server data
             *
            _.sendHttpRequest('GET', '/db/cplanning')
            .then(res => {
                if (!res.isError) {
                    return res.response;
                } else {
                    return _.dataErrorHandler();
                }
            })
            .then(data => {
                if (data) {
                    this.content = data.result;
                    _.gridDays(this.content);
                }
            })
            .catch(error => {
                console.info(error);
                _.dataErrorHandler();
            });
            */
            this.content = that.ref_.data;
            _.gridDays(this.content);
        }
        
        _.sendHttpRequest = (method, url) => {
            const promise = new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.responseType = 'json';
                xhr.onload = () => {
                    if (xhr.status == 200) {
                        resolve(xhr);
                    } else {
                        reject(xhr);
                    }
                }
                xhr.onerror = () => {
                    reject('Something went wrong !');
                }
                xhr.send();
            });
            return promise;
        }
        
        _.init = (u) => {
            this.root = u,
            this.today = new Date(),
            this.days_of_month = [31, _.getFebDays(this.today.getFullYear()), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            this.content,
            this.body,
            this.days = [],
            this.htargets = [],
            this.uniHeight = _.desktop() ? 100 : 50,
            this.currLang = document.documentElement.getAttribute('lang'),
            this.lang_sel = (arr, key) => { return arr[key]; },
            this.coursesName = {"en": ["Collective course", "Private course"], "fr": ["Cours collectif", "Cours privé"]},
            this.colorsTheme = [["#7751d9", "#eee8ff"], ["#2eb3e4", "#e2f4ff"]],
            this.error = {"en": "An error occurred while loading the planning, please try again later.", "fr": "Une erreur s'est produite lors du chargement du planning, veuillez réessayer ultérieurement."},
            this.courses = this.lang_sel(this.coursesName, this.currLang),
            this.daysName = {"en": ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], "fr": ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']},
            this.daysNameShort = {"en": ['M', 'T', 'W', 'T', 'F', 'S', 'S'], "fr": ['L', 'M', 'M', 'J', 'V', 'S', 'D']},
            this.levels = this.lang_sel({"en": ["Tous niveaux", "Débutant", "Intermédiaire", "Confirmé"], "fr": ["Tous niveaux", "Débutant", "Intermédiaire", "Confirmé"]}, this.currLang),
            this.ages = this.lang_sel({"en": ["Tout âge", "Enfant", "Ado", "Adulte"], "fr": ["Tout âge", "Enfant", "Ado", "Adulte"]}, this.currLang),
            this.langDay = this.lang_sel(_.desktop() ? this.daysName : this.daysNameShort, this.currLang),
            _.getElements(),
            _.resizeGrid();
        }

        (function(){
            window.setTimeout(() => {
                _.init(document.querySelector('planning-root'))
            }, 0);
        })()
    } catch (error) {
        console.log(error);
    }
})(this.ref_);