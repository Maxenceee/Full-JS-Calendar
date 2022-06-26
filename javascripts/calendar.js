/*!






 __  __                                                  ____                             
|  \/  |   __ _  __  __   ___   _ __     ___    ___     / ___|   __ _   _ __ ___     __ _ 
| |\/| |  / _` | \ \/ /  / _ \ | '_ \   / __|  / _ \   | |  _   / _` | | '_ ` _ \   / _` |
| |  | | | (_| |  >  <  |  __/ | | | | | (__  |  __/   | |_| | | (_| | | | | | | | | (_| |
|_|  |_|  \__,_| /_/\_\  \___| |_| |_|  \___|  \___|    \____|  \__,_| |_| |_| |_|  \__,_|
    





*/
/*!
*   @author: Maxence Gama, maxence.gama@gmail.com, @maxencegama
*/

!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Calendar = e()
}(this, (function() {
    "use strict";
    const Gs = new Map,
        Zs = new Set;

    const _config = [[{"en": ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],"fr": ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']}], 
                    [{"en": ['M', 'T', 'W', 'T', 'F', 'S', 'S'],"fr": ['L', 'M', 'M', 'J', 'V', 'S', 'D']}],
                    [{"en": ["All ages", "Child", "Teen", "Adult"], "fr": ["Tout âge", "Enfant", "Ado", "Adulte"]}],
                    [{"en": ["All levels", "Beginner", "Intermediate", "Advanced"], "fr": ["Tous niveaux", "Débutant", "Intermédiaire", "Confirmé"]}],
                    [{"en": ["Collective course", "Private course"], "fr": ["Cours collectif", "Cours privé"]}],
                    [{"en": ["Currently unavailable", "Currently available"], "fr": ["Actuellement indisponible", "Actuellement disponible"]}],
                    [{"en": ["Start", "End", "Duration", "Level", "Age"], "fr": ["Début", "Fin", "Durée", "Niveau", "Age"]}],
                    [{"en": "Nothing to see here, come later!", "fr": "Rien à signaler par ici, reviens plus tard !"}],
                    [{"en": "An error occurred while loading the schedule, please try again later.", "fr": "Une erreur s'est produite lors du chargement du planning, veuillez réessayer ultérieurement."}],
                    [[{major: "#7751d9",minor: "#eee8ff"}], [{major: "#2eb3e4",minor: "#e2f4ff"}]]];

    var Jj = function() {
        var a = Me("STYLE"); Ms(a, "type", "text/css");
        a.innerText = window._cfing["css"][0];
        Md(Fe("HEAD")[0], a);
    }
    function Js(t, e) {
        let i = Gs.get(t);
        return i || (i = e(), Gs.set(t, i), Zs.add(i)), i
    }
    const Qs = (t, e, i) => {
        const s = ct(e, i);
        void 0 !== s && t.add(s)
    };
    const Ks = (a) => {
        a.lang = (a && a.lang) || "en"
        return a
    }
    const Ns = (a) => {
        for(var i = 0; i < a.length; i++) {
            let e = a[i];
            if(!("number" === typeof e.dayid) || !("object" === typeof e.dayc)) throw SyntaxError("Bad data patern, make sure to use expected patern.");
            e.dayc = e.dayc.sort(function(a, b) { 
                return a.start - b.start;
            });
        }
        return a
    }

    class tn {
        constructor(t)
        {
            if (!t.data && !t.sourceURL)
                throw Error("Missing data, make sure to add data first.");
            this._config = function(t) {
                return (t = t || {}).options = Ks(t.options || {}) || {}, t.data = Ns(t.data), t
            }(t),
            this._scopeCache = new Map
        }
        get data()
        {
            return this._config.data
        }
        set data(t)
        {
            this._config.data = t
        }
        get options()
        {
            return this._config.options
        }
    }
    var dataErrorHandler = (a, b) => {
        a.innerHTML = "";
        Md(a, Me("h1", "error-handl", {in: b}));
    };

    var wK = function(a) {
        let b = a.timeSet || {}
        a.timeSet = {
            start: b.start || 8,
            end: b.end || 18,
            gap: b.gap || 1
        }
    },
    tK = function(a) {
        let b = a.colorsTheme || {};
        a.colorsTheme = {
            col: b.col || _config[9][0][0],
            prv: b.prv || _config[9][1][0],
        }
        // if (!a.colorsTheme.col.minor || !a.colorsTheme.col.major || !a.colorsTheme.prv.minor || !a.colorsTheme.prv.major)
        //     throw Error("Missing colors, make sure to add all the required options.");
    },
    je = function(a) {
        return "string" == typeof a
    }
    var Me = function(a, b, c) {
        return Le(document, arguments)
    },
    Le = function(a, b) {
        var c = String(b[0]),
            d = b[1],
            e = b[2] || null;
        c = a.createElement(c);
        if (e && e.in) c.innerHTML = e.in;

        b && (d && typeof e !== "object" && !je(d) ? Ne(c, d, e) : (e && e.type ? c.setAttribute(e.type, d) : d && (c.className = d)));
        return c
    },
    Ne = function(b, c, d) {
        function e(h, i) {
            b.setAttribute(h, i);
        }
        for (var i = 0; i < Math.min(c.length, d.length); i++) {
            e(c[i], d[i]);
        }
    },
    Mc = function(a, b) {
        a.classList.add(b);
    },
    Mr = function(a, b) {
        a.classList.remove(b);
    },
    Ms = function(a, b, c) {
        je(b) ? a.setAttribute(b, c !== undefined ? c : "") : Ne(a, b, c)
    },
    Md = function(a, b) {
        (b.length > 1) ? dj(a, b) : a.appendChild(b);
        return a
    },
    Mg = function(a, b) {
        return a.getElementsByClassName(b)
    },
    Mqa = function(a, b) {
        return a.querySelectorAll(b)
    },
    Mq = function(a, b) {
        return a.querySelector(b)
    },
    Fe = function(a, b) {
        return (b || document).getElementsByTagName(String(a))
    },
    dj = function(a, b) {
        for(var i = 0; i < b.length; i++) 
            a.appendChild(b[i]);
    },

    getFebDays = function(year) {
        return isLeapYear(year) ? 29 : 28
    },
    
    isLeapYear = function(year) {
        return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
    },

    daysOfMonth = function(a) {
        return [31, getFebDays(a.getFullYear()), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    },
    
    aspect = function(a) {
        return a > 600 ? a < 900 ? 0.9 : 1.3 : 0.5
    },

    size = function(a) {
        return ((a && a.clientWidth) || window.innerWidth)
    }

    class fn {
        constructor(t, e) {
            Jj();
            const s = this.config = new tn(e);
            this.options = s._config.options,
            this.root = t,
            this.daysName = {long: _config[0][0],
                            short: _config[1][0]}
            wK(this.options);
            tK(this.options);

            var u = this.configure(this.options);
            this.grid = new Grid(t, u, s.data).drawGrid();
        }
        configure(a) {
            a && (a.days = this.langDay(), a.dayslong = this.langLongDay(), a.ages = this.ages(), a.levels = this.levels(), a.courses = this.courses(), a.uniHeight = this.uniHeight(), a.availability = this.availability(), a.textOptions = this.textOptions(), a.empty = this.empty())
            return a
        }
        lang_sel(arr, key) {
            return arr[key]
        }
        langDay() {
            return this.lang_sel(this.daysName.long, this.options.lang)
        }
        langLongDay() {
            return this.lang_sel(this.daysName.long, this.options.lang)
        }
        ages() {
            return this.lang_sel(_config[2][0], this.options.lang)
        }
        levels() {
            return this.lang_sel(_config[3][0], this.options.lang)
        }
        courses() {
            return this.lang_sel(_config[4][0], this.options.lang)
        }
        availability() {
            return this.lang_sel(_config[5][0], this.options.lang)
        }
        textOptions() {
            return this.lang_sel(_config[6][0], this.options.lang)
        }
        empty() {
            return this.lang_sel(_config[7][0], this.options.lang)
        }
        uniHeight() {
            return size() > 600 ? 100 : 50
        }
        error() {
            return this.lang_sel(_config[8][0], this.options.lang)
        }
        dataError() {
            return dataErrorHandler(this.root, this.error())
        }
    }
    var Grid = function(a, b, c) {
        this.today = new Date(),
        this.root = a,
        this.data = c,
        this.options = b,
        this.resizeEvent();
    };
    var g = Grid.prototype;
    g.drawGrid = function() {
        let t = Days(this.today);
        this.gridHead(t), this.gridBody(t);
    };
    g.gridHead = function(w) {
        var td = this.td = this.today.getDay()-1;
        if (td < 0) {
            td = 6;
        }
        let a = Me("div", "cal-top"),
            c = Me("div", "cal-tp-c"),
            u = Me("div", "cal-tp-br"),
            i = Me("div", "cal-root-mob-pop"),
            s = size() < 600;
        Md(this.root, i);
        this.popRoot = i;

        headDaysRow(this, w, td, c);
        
        s && smallGesture(this, a);
        s ? Mc(this.root, "-small") : Mr(this.root, "-small")

        Md(this.root, Md(a, [u, c]));
    };
    g.gridBody = function(w) {
        let a = Me("div", "cal-grid-bd scroll-shadow-btm"),
            b = Me("div", "cal-grid-bd-c"),
            l = Me("div", "cal-grid-lp"),
            s = Me("div", "cal-grid-rp-c"),
            timeSet = this.options.timeSet,
            start = (timeSet.start >= 0 ? timeSet.start : 0),
            end = (timeSet.end < 24 ? timeSet.end : 23),
            days = 7,
            nx = getMinMax(this.data);

        nx.min < start && (start = nx.min);
        nx.max >= end && (end = nx.max+1);

        let duration = end-start+2;
        (duration < 24 || (duration = 23));

        datesColumn(l, start, duration, timeSet, this), gridPatern(s, days, {start: start, end: end, gap: timeSet.gap}, duration, timeSet, this), scrollShadow(b, a);
        emptyCal(this.data) && this.gridEmpty();

        Md(this.root, Md(a, Md(b, Md(Me("div", "cal-grid-bd-cp"), [l, Md(Me("div", "cal-grid-rp"), s)]))));
        
        size() < 600 && this.gridGrow("cal-tp-day", "cal-grid-el-pr", this.td);
    };
    g.gridGrow = function(r, d, i) {
        if (i > 6 || i < 0) return
        this.selectedIndexGrid = i
        Mqa(document, ".cal-tp-day-tt").forEach((e, u) => {
            e.innerHTML = this.options.dayslong[u]
        });
        let a = Mg(document, r),
            b = Mg(document, d);
        [].forEach.call(a, function(el) {
            Mr(el, "selected-day");
        });
        Mc(a[i], "selected-day");
        [].forEach.call(b, function(el) {
            Mr(el, "selected-day");
        });
        Mc(b[i], "selected-day");
        Ms(Mq(document, "cal-tp-mob-day-btn cal-btn-left"), "curr-sel", i);
        Ms(Mq(document, "cal-tp-mob-day-btn cal-btn-right"), "curr-sel", i);
    }
    g.resizeEvent = function() {
        this.standardViewportWidth = window.innerWidth,
        this.revent = new CalEvents(["resize"], window, this.gridresize.bind(this));
    };
    g.gridresize = function(a) {
        if (this.standardViewportWidth !== window.innerWidth) {
            if (size() > 600) this.options.uniHeight = 100;
            else this.options.uniHeight = 50;
            this.root.innerHTML = "";
            this.drawGrid();
            this.standardViewportWidth = window.innerWidth
        }
    };
    g.gridEmpty = function() {
        Md(this.root, Md(Me("div", "cal-empty-cnt"), Md(Me("div", "cal-empty-cnt-c"), Me("p", "", {in: this.options.empty}))))
    };

    var headDaysRow = function(a, n, m, o) {
        for(var x = 0; x < n.week.length; x++) {
            var b = Me("div", x, {type: "day"}),
                d = Me("div", "cal-tpd-c");
            Mc(b, "cal-tp-day")
            if (m == x && !n.nextWeek) Mc(b, "cal-curr-day");
            Md(o, Md(b, Md(d, [Me("H3", "cal-tp-day-tt", {in: a.options.days[x]}), Me("H2", "cal-tp-day-nb", {in: n.week[x]})])));
        }
    },
    smallGesture = function(a, b) {
        let n = Me("div", "cal-tp-mob-day-btn cal-btn-left"),
            m = Me("div", "cal-tp-mob-day-btn cal-btn-right");
        Md(b, [n, m]);
        [n,m].forEach((e,i) => {
            e.onclick = () => {
                mobSlidingDay(a, i);
            }
        });
    },
    datesColumn = function(n, m, o, p, q) {
        for(var x = 0; x < o; x += p.gap) {
            let dn = Me("div", "cal-grid-dn"),
                l = m+x-1,
                h = l < 10 ? '0'+Math.floor(l) : Math.floor(l),
                b = l % 1 > 0 ? 60*(l % 1) : "00",
                dt = Me("p", "cal-grid-dn-t", x>0 && {in: (h + ":" + b)});
            
            dn.style.height = q.options.uniHeight+"px";
            Md(n, Md(dn, dt));
        }
    },
    gridPatern = function(n, m, o, p, q, t) {
        for(var y = 0; y < m; y++) {
            let d = Me("div", "cal-grid-el-pr"),
                un = Me("div", "cal-line-r-c"),
                s = size() > 600;
            Ms(d, "cal-line-index", y);

            linePatern(p, q, t, d);
            t.data.length && (createEvents(t, un, y, getElementsIndex(t.data[y].dayc, s), o))
            Md(n, Md(d, un));
        }
    },
    linePatern = function(n, m, o, p) {
        for(var x = 0; x < n; x+=m.gap) {
            let dy = Me("div", "cal-grid-el-in");
            Ms(dy, "cal-col-index", x);
            if (x == n-m.gap) Ms(dy, "cal-col-last");
            dy.style.setProperty("--cal-el-uniheight", o.options.uniHeight+"px");
            Md(p, dy);
        }
    },
    scrollShadow = function(e, l) {
        e.onscroll = () => {
            if (e.scrollHeight-e.clientHeight <= e.scrollTop)
                Mr(l, "scroll-shadow-mdl"), Mc(l, "scroll-shadow-top");
            else if (0 >= e.scrollTop)
                Mr(l, "scroll-shadow-mdl"), Mc(l, "scroll-shadow-btm");
            else
                Mr(l, "scroll-shadow-top"), Mr(l, "scroll-shadow-btm"), Mc(l, "scroll-shadow-mdl");
        }
    },
    createEvents = function(a, b, c, d, e) {
        let t = Days(a.today),
            n = a.events = [],
            m = a.data[c].dayc;
        for(var i = 0; i < m.length; i++) {
            let evt = new Event(b, a, m[i], a.data[c].dayid, t, c, e);
            evt.drawEvent(d[i]);
            Md(b, evt.grt());
            new Popup(a, evt.grt(), m[i]);
            n.push(evt);
        }
    },
    mobSlidingDay = function(a, b) {
        let index = parseInt(Mq(document, ".cal-tp-day.selected-day").getAttribute("day")) + (b === 0 ? -1 : 1);
        a.gridGrow("cal-tp-day", "cal-grid-el-pr", index);
    },
    emptyCal = function(a) {
        return 0 === a.length || 0 === a.filter(e => {
            return e.dayc.length > 0
        }).length;
    },
    getMinMax = function(a) {
        if (!a.length) return null
        let b = structuredClone(a);
        return {
            min: parseInt(sortForMin(b)),
            max: parseInt(sortForMax(b))
        }
    },
    sortForMin = function(a) {
        return a.sort((d, e) => {
            return (d.dayc.length && d.dayc.sort((f, g) => {
                return f.start >= g.start
            })[0].start || 9999) >= (e.dayc.length && e.dayc.sort((f, g) => {
                return f.start >= g.start
            })[0].start || 9999)
        })[0].dayc[0].start.slice(0, 2);
    },
    sortForMax = function(a) {
        return a.sort((d, e) => {
            return (d.dayc.length && d.dayc.sort((f, g) => {
                return f.end <= g.end
            })[0].end || 0) <= (e.dayc.length && e.dayc.sort((f, g) => {
                return f.end <= g.end
            })[0].end || 0)
        })[0].dayc[0].end.slice(0, 2);
    }

    var Event = function(a, b, c, d, e, f, g) {
        this.t = e,
        this.root = a,
        this.container = b,
        this.options = b.options,
        this.height = b.options.uniHeight,
        this.content = c,
        this.id = d,
        this.y = f,
        this.timeSet = g,
        this.element = Me("div", "cal-grid-rdv-el");
    };
    var e = Event.prototype;
    e.grt = function() {
        return this.element
    };
    e.drawEvent = function(a) {
        let e = this.options,
            f = this.content,
            t = this.height,
            n = this.element,
            o = Me("div"),
            x = this.root,
            topPlacement = this.eventTopOffset(f, this.timeSet.start, this.timeSet.gap),
            startOff = this.eventOffset(f, t, this.timeSet.gap),
            lengthrdv = this.eventLength(f, this.timeSet.gap),
            lm = Me("h3", "cal-r-tt", {in: e.courses[f.txt]});
        // console.log(topPlacement, startOff, lengthrdv);
        Md(o, lm),
        this.addDetails(lengthrdv, f, Me("div"), lm, o),
        Md(o, inn(f)),
        this.addPropreties(f, lengthrdv, topPlacement, startOff, t, a),
        Md(n, Md(Me("div", "cal-grid-rdv-el-in"), o)),
        this.availability(f, this.id, n);
        n.onmouseover = () => {
            Mc(x, "cal-grid-el-over");
            Mc(n, "cal-grid-el-overed");
        }
        n.onmouseout = () => {
            Mr(x, "cal-grid-el-over");
            Mr(n, "cal-grid-el-overed");
        }
    };
    e.eventTopOffset = function(a, b, c) {
        return (parseInt(a.start.slice(0, 2)) - b+1)/c
    };
    e.eventOffset = function(a, b, c) {
        return ((b / c) / 60 * parseInt(a.start.slice(2)))
    };
    e.eventLength = function(a, b) {
        return ((parseInt(a.end.slice(0, 2))) - (parseInt(a.start.slice(0, 2))) - (parseInt(a.start.slice(2)) / 60 * 1) + (parseInt(a.end.slice(2)) / 60 * 1)) / b
    };
    e.addDetails = function(a, b, c, d, e) {
        let n = b.age !== undefined,
            m = b.level !== undefined;
        if (size() > 600 && a >= 1)
            n && lag(c, this.element, b, this.options),
            m && llv(c, this.element, b, this.options),
            Md(e, c);
        else if (size() > 600 && a < 1)
            n && Ms(this.element, "rdv-el-age", b.age),
            m && Ms(this.element, "rdv-el-lvl", b.level),
            a <= 0.7 && (d.innerText += "..."),
            Md(e, Me("h4", "", {in: a > 0.7 ? "...":""}));
        else
            Ms(c, "class", "cal-el-r-mob-info cal-mob-info-image"),
            Md(this.element, c);
    };
    e.availability = function(a, b, c) {
        var td = this.container.today.getDay()-1;
        if (td < 0) {
            td = 6;
        }
        if (!Boolean(a.isAvailable) || (!this.t.nextWeek && (td > b || ((td == b && parseInt(a.end.slice(0, 2)) < this.container.today.getHours()) || (td == b && parseInt(a.end.slice(0, 2)) == this.container.today.getHours() && parseInt(a.end.slice(2)) < this.container.today.getMinutes()))))) {
            c.style.opacity = "0.5",
            Mc(c, "r-unvailable"),
            Ms(c, "el-disp", 0);
        } else {
            Ms(c, "el-disp", 1);
        }
    };
    e.addPropreties = function(a, b, c, d, e, f) {
        Ms(this.element, ["el-date", "rdv-id", "txt-type", "day-el", "rdv-el-s", "rdv-el-e", "day-even", "gridIndex"], [this.t.week[this.y], a.id, a.txt, this.id, a.start, a.end, "", this.y]);
        let n = this.element,
            m = this.options.colorsTheme;
        n.style.setProperty("--major-border-color", dl(m, a.txt, 1)),
        n.style.setProperty("--major-backgrounColor", dl(m, a.txt, 0)),
        n.style.position = "absolute",
        n.style.height = (e * (b >= 0.5 ? b : 0.5)) + "px",
        n.style.top = (e * c + d)-1 + "px",
        n.style.width = "calc("+ (f.size) +"% - 0px)",
        n.style.left = f.offset+"%";
    };

    var lag = function(a, b, c, d) {
        Ms(b, "rdv-el-age", c.age),
        Md(a, Me('h3', "", {in: d.ages[c.age+1]}));
    },
    llv = function(a, b, c, d) {
        Ms(b, "rdv-el-lvl", c.level),
        Md(a, Me('h3', "", {in: d.levels[c.level+1]}));
    },
    inn = function(a) {
        let j = a.start.slice(0, 2)+":"+a.start.slice(2)+" - "+a.end.slice(0, 2)+":"+a.end.slice(2)
        return Me("h4", "cal-r-date", {in: j})
    },
    dl = function(a, b, c) {
        let n = b ? "prv" : "col",
            m = a[n]
        if (!m.major || !m.minor)
            throw Error("Two color arguments are required, "+n+".minor and "+n+".major, please follow expected patern.")
        return m[c ? "major" : "minor"]
    },
    stringToTimeMin = (a) => {
        if (typeof a === 'number') return a
        return parseInt(a.slice(0, 2)) * 60 + parseInt(a.slice(2))
    }

    var getElementsIndex = function(a, n) {
        var b = [],
            res = {},
            l = 100,
            j = n ? 20 : 50,
            h = 10,
            g;
    
        if (a.length <= 1) {
            return [{index: 0, size: 100, offset: 0, object: a[0]}]
        }
        a.forEach((e, i) => {
            let st = stringToTimeMin(e.start),
                ed = stringToTimeMin(e.end),
                size = 0,
                offset;
    
            if (i == 0) {
                if (i+1 <= a.length-1) {
                    let nxst = stringToTimeMin(a[i+1].start);
                    // console.log(nxst, st, ed);
    
                    if (nxst >= st && nxst <= ed) {
                        size = l-h
                        offset = 0;
                    } else {
                        size = l
                        offset = 0;
                    }
                }
            } else {
                for (var el = i-1; el >= 0; el--) {
                    let nxst = stringToTimeMin(a[el].start),
                        nxed = stringToTimeMin(a[el].end),
                        st =  stringToTimeMin(e.start),
                        ed =  stringToTimeMin(e.end);
                    if (nxed - nxst < 60) nxed = nxst + 60;
                    
                    if (el-1 >= 0 && nxst <= st && nxed >= ed && b[el].size < l && b[el].offset == 0) {
                        size = l-j
                        offset = j;
                        break;
                    } else if (nxst <= st && nxed >= ed) {
                        size = n ? l-h : l-j
                        offset = 0;
                        break;
                    } else if (nxed >= ed || nxst <= ed && nxed > st || nxed > st) {
                        size = n ? l-h : l-j
                        offset = n ? h : j;
                        if (b[el].offset > 0) {
                            size -= h;
                            offset += h;
                        }
                        break;
                    } else if (0 == size) {
                        size = l
                        offset = 0;
                    }
                }
            }
            b.push({index: i, size: size, offset: offset, object: e});
        });
        return b
    }

    var Days = function(a) {
        let weekDays = [],
            nextWeek = false;
        
        var td = a.getDay()-1;
        if (td < 0) {
            td = 6;
        }
        if (a.getDay() == 0 && a.getHours() < 17) {
            for(var i = 6; i >= 0; i--) {
                let b = a.getDate() - i
                if (b <= 0) {
                    let u = a.getMonth(a);
                    if (u == 0) u = 11
                    b = daysOfMonth(a)[u] + b;
                }
                weekDays.push(b);
            }
        } else {
            if (a.getDay() == 0 && a.getHours() > 16 && a.getMinutes() >= 0) {
                nextWeek = true
            }
            for(var i = 0; i < 7; i++) {
                var b = (a.getDate() - a.getDay()+1 + i)
    
                if (a.getMonth(a) <= 1 && b <= 0) {
                    b = (daysOfMonth(a)[11] - a.getDay() + i + 2)
                } else if (b > daysOfMonth(a)[a.getMonth(a)] && a.getMonth(a) < 11) {
                    b -= daysOfMonth(a)[a.getMonth(a)];
                } else if (b <= 0) {
                    b = daysOfMonth(a)[a.getMonth(a)-1] + b;
                } else if (b > daysOfMonth(a)[a.getMonth(a)] && a.getMonth(a) >= 11) {
                    b = i - td + a.getDate() - daysOfMonth(a)[a.getMonth(a)] + (nextWeek ? 7 : 0);
                }
                weekDays.push(b);
            }
        }
        return {nextWeek: nextWeek, week: weekDays}
    }

    var CalEvents = function(a, c) {
        this.event = null;
        this.calling = null;
        a && this.dispatchEvent(...arguments);
    };
    var ce = CalEvents.prototype;
    ce.dispatchEvent = function(a, b, c) {
        let d = this.event;
        if (d) {
            throw Error("Event already exist");
        }
        this.calling = b;
        this.event = c;
        this.name = a;
        for(var i = 0; i < a.length; i++)
            b.addEventListener(a[i], this.event, {passive: true});
    };
    ce.event = function() {
        return this.event
    };
    ce.removeEvent = function(a) {
        for(var i = 0; i < a.length; i++)
            this.calling.removeEventListener(this.name[i], this.event);
    };

    var Popup = function(a, b, c) {
        let t = this.eventElm = b,
            u = this.parent = a.popRoot;
        this.container = a,
        this.base = null,
        this.events = [],
        this.content = c;
        while (u.lastElementChild) {
            u.removeChild(u.lastElementChild);
        }
        this.lesteners();
    }
    var p = Popup.prototype;
    p.lesteners = function() {
        let q = size() > 600,
            n = q ? oppb() : dppb(this.parent),
            t = this,
            b = stringToTime(this.content),
            c = this.container;
        this.base = n.m,
        this.d = q,
        Md(n.t, jhover(this.eventElm, c.today)),
        Md(n.b, fhover(this.content, c.options, b));

        let z = [["resize"], document, t.onresize.bind(this)];

        q ? this.newEvts([[["mouseenter"], t.eventElm, t.show.bind(this)], [["mouseleave"], t.eventElm, t.remove.bind(this)], z]) :
        this.newEvts([[["click"], t.eventElm, t.show.bind(this)], z])
    };
    p.show = function() {
        let t = this;
        Md(t.parent, t.base);
        this.d && (this.moveEvent = new CalEvents(["mousemove"], document, t.move.bind(this)));
    };
    p.move = function(e, y) {
        let d = this.base,
            i = d.getBoundingClientRect(),
            o = this.container.root.getBoundingClientRect(),
            r = size() > 600,
            l = coor(r, e, o, i),
            m = e.clientY < o.top + o.height - (i.height + 10) ? 10 : - (i.height);
        trs(d, e, l, m);
    };
    p.remove = function() {
        this.base.remove();
        this.moveEvent.removeEvent(this.move);
    };
    p.onresize = function() {
        this.remove();
        this.events.forEach(e => e.resizeEvent(e.event()));
    };
    p.newEvts = function(a, b, c) {
        a && !b && !c ? jdg(a, this.events) : jdf(this.events, a, b, c);
    };

    var jdf = function(a, b, c, d) {
        a.push(new CalEvents(b, c, d));
    },
    jdg = function(a, b) {
        for(var i = 0; i < a.length; i++) {
            let d = a[i];
            jdf(b, d[0], d[1], d[2]);
        }
    }

    var stringToTime = function(a) {
        let sh = parseInt(a.start.slice(0,2))*60,
            sm = parseInt(a.start.slice(2)),
            eh = parseInt(a.end.slice(0,2))*60,
            em = parseInt(a.end.slice(2)),
            timeSE = (eh + em) - (sh + sm),
            elmDH = Math.floor(timeSE/60),
            elmDM = timeSE%60;
        return {h: elmDH, m: elmDM, dates: {sh: sh/60, sm: sm, eh: eh/60, em: em}}
    },
    dppb = function(t) {
        let a = Me("div", "cal-mob-pop-root-c"),
            c = Me("div", "cal-mob-pop-close"),
            n = oppb();
        Ms(c, "id", "cal-mob-pop-close-btn");
        a.onclick = (e) => {
            if (e.target === c || e.target === a) {
                Mr(t, "-pop-active"), a.remove();
            }
        }
        Md(a, Md(Me("div", "cal-mob-pop-box-cnt"), [c, n.x]));
        return {m: a, t: n.t, b: n.b}
    },
    oppb = function() {
        let b = Me("div", "cal-hover-el-c-t"),
            c = Me("div", "cal-hover-el-c-b"),
            d = Me("div", "cal-hover-el-c");
        return {m: Md(Me("div", "cal-hover-el"), Md(d, [b, c])), x: Md(d, [b, c]), t: b, b: c}
    },
    jhover = (u, v) => {
        let t = u.getAttribute('el-date') + '-'+ (parseInt(u.getAttribute('el-date')) < v.getDate() ? v.getMonth()+2 : v.getMonth()+1)
        return Md(Me("div", "cal-hover-el-c-t-c"), [Md(Me("div", ""), Me("div", "cal-hover-el-c-t-c-image")), Me("h4", "", {in: t})]);
    },
    fhover = (n, m, o) => {
        let t = m,
            a = Me("h1", "cal-tp-day-tt", {in: t.courses[n.txt]}),
            b = Me("h2", "cal-tp-day-tt", {in: t.availability[n.isAvailable]}),
            c = uks(0, ((o.dates.sh < 10 && "0") + o.dates.sh)+":"+((o.dates.sm < 10 && "0") + o.dates.sm), t),
            d = uks(1, ((o.dates.eh < 10 && "0") + o.dates.eh)+":"+((o.dates.em < 10 && "0") + o.dates.em), t),
            e = uks(2, (o.h >= 1 ? (o.h +'h'+ (o.m ? o.m : '')) : (o.m + 'mins')), t),
            f = uks(3, t.levels[n.level+1 || 0], t),
            g = uks(4, t.ages[n.age+1 || 0], t);

        a.style.color = dl(t.colorsTheme, n.txt, 0)+'!important;'
        b.style.color = !n.isAvailable ? "#E64826" : "#18BEC9";
        return Md(Me("div", "cal-hover-el-c-b-c"), [a, Md(Me("div"), [b, c, d, e, g, f])]);
    },
    uks = function(a, b, c) {
        return Md(Me("h3"), [Me("span", "strong", {in: c.textOptions[a]+": "}), Me("span", "", {in: b})]);
    },
    coor = function(a, b, c, d) {
        return a ? b.clientX < c.left + c.width - (d.width + 10) ? 10 : - (d.width) : b.clientX < c.left + c.width/2 ? 10 : - (d.width)
    },
    trs = function(a, b, c, d) {
        a.style.transform = 'translate3d('+ (b.clientX + c) +'px, '+ (b.clientY + d) +'px, 0px)';
    }
    
    return fn.Calendar = fn, "undefined" != typeof window && (window.Calendar = fn), fn
}));

window._cfing = {css: ['.planning-root{--body-bg-l:#ffffff;--body-bg-d:#000000;--glassy-bg:rgba(255, 255, 255, 1);--footer-bg:#fff;--footer-text:#000;--blue:#A0C7F8;--planning-blue:#1a4e6d;--book-btn:#3877B8;--main-color:#18BEC9;--main-color-b:rgba(24, 190, 201, 0.2);--ad-blue:#f2f6fc;position:relative;height:min-content;width:60%;border-radius:25px;overflow:hidden;background-color:#fff}.cal-top{position:relative;width:100%;height:100px;display:flex;display:-webkit-flex;flex-direction:row;background-color:#f8f9ff}.cal-tp-br{height:100%;width:70px}.cal-grid-bd{position:relative;width:100%;height:70vh;background-color:#fff}@media screen and (max-width:600px){.cal-grid-bd{max-height:500px}}.cal-tp-c{position:relative;width:calc(100% - 70px);height:100%;display:flex;display:-webkit-flex;flex-direction:row}.cal-tp-day{position:relative;width:calc(100% / 7);height:100%}.cal-mob-pop-root-c{z-index:5000;position:fixed;top:0;left:0;height:100vh;width:100vw;display:flex;display:-webkit-flex;display:-webkit-flex;justify-content:center;align-items:center;background-color:rgba(0,0,0,.05)}.cal-mob-pop-box-cnt{position:relative;width:250px;height:300px;background-color:#fff;border-radius:20px;box-shadow:0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12),0 11px 15px -7px rgba(0,0,0,.2)}.cal-mob-pop-close{position:absolute;z-index:30;top:15px;left:15px;height:20px;width:20px;background-repeat:no-repeat;background-size:cover;background-image:url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4cHgiIGhlaWdodD0iNDhweCI+PHBhdGggZD0iTSAzOS40ODYzMjggNi45Nzg1MTU2IEEgMS41MDAxNSAxLjUwMDE1IDAgMCAwIDM4LjQzOTQ1MyA3LjQzOTQ1MzEgTCAyNCAyMS44Nzg5MDYgTCA5LjU2MDU0NjkgNy40Mzk0NTMxIEEgMS41MDAxNSAxLjUwMDE1IDAgMCAwIDguNDg0Mzc1IDYuOTg0Mzc1IEEgMS41MDAxNSAxLjUwMDE1IDAgMCAwIDcuNDM5NDUzMSA5LjU2MDU0NjkgTCAyMS44Nzg5MDYgMjQgTCA3LjQzOTQ1MzEgMzguNDM5NDUzIEEgMS41MDAxNSAxLjUwMDE1IDAgMSAwIDkuNTYwNTQ2OSA0MC41NjA1NDcgTCAyNCAyNi4xMjEwOTQgTCAzOC40Mzk0NTMgNDAuNTYwNTQ3IEEgMS41MDAxNSAxLjUwMDE1IDAgMSAwIDQwLjU2MDU0NyAzOC40Mzk0NTMgTCAyNi4xMjEwOTQgMjQgTCA0MC41NjA1NDcgOS41NjA1NDY5IEEgMS41MDAxNSAxLjUwMDE1IDAgMCAwIDM5LjQ4NjMyOCA2Ljk3ODUxNTYgeiIvPjwvc3ZnPg==)}.cal-mob-info-image{background-size:contain;background-image:url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPjxwYXRoIGQ9Ik0gNjQgNiBDIDMyIDYgNiAzMiA2IDY0IEMgNiA5NiAzMiAxMjIgNjQgMTIyIEMgOTYgMTIyIDEyMiA5NiAxMjIgNjQgQyAxMjIgMzIgOTYgNiA2NCA2IHogTSA2NCAxMiBDIDkyLjcgMTIgMTE2IDM1LjMgMTE2IDY0IEMgMTE2IDkyLjcgOTIuNyAxMTYgNjQgMTE2IEMgMzUuMyAxMTYgMTIgOTIuNyAxMiA2NCBDIDEyIDM1LjMgMzUuMyAxMiA2NCAxMiB6IE0gNjQgMzAgQSA5IDkgMCAwIDAgNjQgNDggQSA5IDkgMCAwIDAgNjQgMzAgeiBNIDY0IDU5IEMgNTkgNTkgNTUgNjMgNTUgNjggTCA1NSA5MiBDIDU1IDk3IDU5IDEwMSA2NCAxMDEgQyA2OSAxMDEgNzMgOTcgNzMgOTIgTCA3MyA2OCBDIDczIDYzIDY5IDU5IDY0IDU5IHoiLz48L3N2Zz4=)}@media screen and (max-width:600px){.cal-grid-el-pr,.cal-tp-day{overflow:hidden;width:calc(100%)!important;opacity:1;will-change:opacity width;transition:width opacity .3s ease;-moz-transition:width opacity .3s ease;-webkit-transition:width opacity .3s ease}.cal-grid-el-pr:not(.selected-day) .cal-grid-rdv-el{width:0;transition:width .3s ease;-moz-transition:width .3s ease;-webkit-transition:width .3s ease}.cal-grid-el-pr:not(.selected-day) .cal-grid-rdv-el .cal-grid-rdv-el-in{background-color:transparent;transition:background-color .3s ease;-moz-transition:background-color .3s ease;-webkit-transition:background-color .3s ease}.cal-grid-el-pr:not(.selected-day) .cal-grid-rdv-el .cal-grid-rdv-el-in>div{display:none}.cal-tp-day{border:none!important}.cal-tp-day:not(.selected-day) .cal-tp-day-nb{transform:scale(.7);transition:.5s ease;-moz-transition:.5s ease;-webkit-transition:.5s ease}.cal-grid-el-pr:not(.selected-day),.cal-tp-day:not(.selected-day){width:0!important;opacity:0;will-change:opaity}.cal-tp-br{width:0!important}.cal-grid-lp{width:50px!important}.cal-grid-rp{width:calc(100% - 50px)!important}.cal-tp-c{width:100%}}.cal-tp-day.cal-curr-day h2,.cal-tp-day.cal-curr-day h3{color:#6b7eff!important;font-weight:900!important}.cal-tp-day:not(.cal-tp-day[day="0"]){border-left:solid #e4e6fa 1px}.cal-tpd-c{position:relative;height:100%;width:100%;display:flex;display:-webkit-flex;flex-direction:column;justify-content:center;align-items:center}.cal-tp-day-nb,.cal-tp-day-tt{color:#4b719a}.cal-tp-day-tt{font-weight:100}.cal-tp-mob-day-btn{position:absolute;z-index:10;top:35px;width:30px;height:30px;background-size:cover;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTg1LjM0MyAxODUuMzQzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxODUuMzQzIDE4NS4zNDM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48Zz48cGF0aCBzdHlsZT0iZmlsbDojMWE0ZTZkOyIgZD0iTTUxLjcwNywxODUuMzQzYy0yLjc0MSwwLTUuNDkzLTEuMDQ0LTcuNTkzLTMuMTQ5Yy00LjE5NC00LjE5NC00LjE5NC0xMC45ODEsMC0xNS4xNzUgbDc0LjM1Mi03NC4zNDdMNDQuMTE0LDE4LjMyYy00LjE5NC00LjE5NC00LjE5NC0xMC45ODcsMC0xNS4xNzVjNC4xOTQtNC4xOTQsMTAuOTg3LTQuMTk0LDE1LjE4LDBsODEuOTM0LDgxLjkzNCBjNC4xOTQsNC4xOTQsNC4xOTQsMTAuOTg3LDAsMTUuMTc1bC04MS45MzQsODEuOTM5QzU3LjIwMSwxODQuMjkzLDU0LjQ1NCwxODUuMzQzLDUxLjcwNywxODUuMzQzeiIvPjwvZz48L2c+PC9zdmc+DQo=);background-repeat:no-repeat}.cal-tp-mob-day-btn.cal-btn-left{left:20px;transform:rotateZ(180deg)}.cal-tp-mob-day-btn.cal-btn-right{right:20px}.cal-tp-mob-day-btn.cal-btn-left[curr-sel="0"]{opacity:.5}.cal-tp-mob-day-btn.cal-btn-right[curr-sel="6"]{opacity:.5}.cal-grid-bd-c{position:relative;height:100%;width:100%;overflow-y:scroll;border-bottom-right-radius:25px;border-bottom-left-radius:25px}.cal-grid-bd::before{transition:.3s;-moz-transition:.3s;-webkit-transition:.3s;will-change:background;background:0 0}.cal-grid-bd.scroll-shadow-top::before{content:"";background:linear-gradient(180deg,rgba(0,0,0,.03) 0,rgba(0,0,0,0) 5%);inset:0;position:absolute}.cal-grid-bd.scroll-shadow-mdl::before{content:"";background:linear-gradient(0deg,rgba(0,0,0,.06) 0,rgba(0,0,0,0) 5%,rgba(0,0,0,0) 95%,rgba(0,0,0,.03) 100%);inset:0;position:absolute}.cal-grid-bd.scroll-shadow-btm::before{content:"";background:linear-gradient(0deg,rgba(0,0,0,.06) 0,rgba(0,0,0,0) 5%);inset:0;position:absolute}.cal-grid-bd-cp{position:relative;width:100%;height:max-content;display:flex;display:-webkit-flex;flex-direction:row}.cal-grid-el-pr{position:relative;height:max-content;width:calc(100% / 7);display:flex;display:-webkit-flex;flex-direction:column}.cal-grid-lp{position:relative;height:100%;width:70px}.cal-grid-dn{position:relative;width:100%}.cal-grid-dn-t{position:absolute;top:-10px;left:calc(100% / 5);color:#2d6292;font-size:.8em;font-weight:800}.cal-grid-rp{position:relative;display:flex;display:-webkit-flex;flex-direction:row;width:calc(100% - 70px);height:100%}.cal-grid-rp-c{position:relative;width:100%;height:100%;display:flex;display:-webkit-flex;flex-direction:row}.cal-line-r-c{width:100%;height:100%;top:0;left:0}.cal-grid-el-in{position:relative;width:100%;height:var(--cal-el-uniheight)}@media screen and (min-width:600px){.cal-grid-el-in:not(.cal-grid-el-pr[cal-line-index="0"]>.cal-grid-el-in):not(.cal-grid-el-in:last-child){border-left:solid #e4e6fa 1px}.cal-grid-el-in:not(.cal-grid-el-pr[cal-line-index="0"]>.cal-grid-el-in){border-left:solid #e4e6fa 1px}.cal-grid-el-pr>.cal-grid-el-in:not(.cal-grid-el-in[cal-col-last]){border-bottom:solid #e4e6fa 1px}}@media screen and (max-width:600px){.cal-grid-el-pr>.cal-grid-el-in:not(.cal-grid-el-in[cal-col-last]){border-bottom:solid #e4e6fa 1px}}.cal-grid-el-over .cal-grid-rdv-el:not(.cal-grid-el-overed){opacity:.5!important}.cal-grid-el-over .cal-grid-rdv-el.cal-grid-el-overed{opacity:1!important}.cal-grid-rdv-el{width:calc(100% - 5px);min-width:30%;padding-right:5px;z-index:10;overflow:hidden;transition:.3s ease-in-out}.cal-grid-rdv-el:hover{z-index:4000;opacity:1!important}.cal-grid-rdv-el{cursor:pointer}.cal-grid-rdv-el h3{cursor:pointer}.cal-grid-rdv-el.r-unvailable{cursor:not-allowed}.cal-grid-rdv-el.r-unvailable h3{cursor:not-allowed}.cal-grid-rdv-el .cal-grid-rdv-el-in{position:relative;width:100%;height:100%;overflow:hidden;border-top:1px solid #fff;border-left:5px solid var(--major-border-color);border-right:1px solid #fff;border-bottom:1px solid #fff;border-top-right-radius:15px;border-bottom-right-radius:15px;background-color:var(--major-backgrounColor);padding:10px 5px 10px 5px}.cal-grid-rdv-el.r-unvailable .cal-grid-rdv-el-in{border-width:2px}.cal-grid-rdv-el .cal-grid-rdv-el-in>div{position:relative;width:100%;height:100%;display:flex;display:-webkit-flex;flex-direction:column;justify-content:flex-start}.cal-grid-rdv-el .cal-tp-day-nb,.cal-grid-rdv-el .cal-tp-day-tt,.cal-r-date,.cal-r-tt{font-family:Quicksand-SemiBold,sans-serif!important;font-size:.8em;font-weight:800}.cal-grid-rdv-el .cal-grid-rdv-el-in>div h3{font-size:.8em;color:var(--major-border-color)}.cal-grid-rdv-el .cal-grid-rdv-el-in>div>div h3{font-weight:500}.cal-grid-rdv-el .cal-grid-rdv-el-in>div>h4{font-size:.7em;font-weight:600;color:var(--major-border-color)}.cal-grid-rdv-el .cal-grid-rdv-el-in>div>h5{font-size:.5em;font-weight:900;vertical-align:middle;color:var(--major-border-color)}.cal-grid-rdv-el .cal-grid-rdv-el-in>div>div{padding:3px 0}.cal-el-r-mob-info{z-index:15;position:absolute;top:5px;right:10px;height:20px;width:20px}.cal-el-r-mob-info svg{position:relative;height:100%;width:100%;fill:var(--major-border-color)}@media screen and (max-width:750px){.cal-tp-day-nb{font-size:1.1em}.cal-hover-el{width:185px!important}}.cal-empty-cnt{position:absolute;bottom:10px;left:0;width:100%;z-index:10}.cal-empty-cnt-c{position:relative;width:100%;display:flex;justify-content:center;align-items:center}.cal-empty-cnt-c>p{position:relative;font-size:1.5em;text-align:center;font-weight:800;color:rgba(0,0,0,.3)}.planning-body{position:relative;width:100%;height:100%;min-height:60vh;display:flex;display:-webkit-flex;flex-direction:row}.pl-day{position:relative;width:calc(100% / 5);border-right:solid 1px #000}.pl-day:first-child{border-left:solid 1px #000}.day-title{position:relative;width:100%;height:50px}.day-title h1{font-size:1.3em;text-align:center;font-weight:900}.day-ev{height:180px;display:flex;display:-webkit-flex;flex-direction:column;justify-content:space-around;align-items:center;padding-bottom:25px}.day-ev:hover{background-color:#dff5f7}.day-ev:not(.day-ev:last-child){border-bottom:solid 1px #000}.day-evtt{font-size:1.2em;font-weight:600}.day-evds{font-size:1em;font-weight:800;text-align:center}.planning-c-tt{position:relative;width:100%;margin:120px 0 50px;display:flex;display:-webkit-flex;justify-content:center}.planning-c-tt-e{position:relative;height:100%;width:max-content}.planning-c-tt-e h1{font-weight:900;font-size:var(--page-sec-tt);color:#1a4e6d}.cal-hover-el{position:fixed;z-index:5000;width:200px;background-color:#fff;top:0;left:0;box-shadow:0 10px 40px 0 rgba(0,40,85,.1);padding:10px;border-radius:7px}.cal-hover-el-c{position:relative;width:100%;height:100%}.cal-hover-el-c-t{position:relative;width:100%;height:15%}.cal-hover-el-c-t{padding:5px;display:flex;display:-webkit-flex;justify-content:flex-end}.cal-hover-el-c-t-c{position:relative;height:100%;width:30%;display:flex;display:-webkit-flex;flex-direction:row;justify-content:space-between;align-items:center}.cal-hover-el-c-t-c h4{position:relative;width:60%;text-align:center;font-size:.7em;font-weight:800}.cal-hover-el-c-t-c>div{position:relative;height:100%;width:40%}.cal-hover-el-c-t-c-image{position:relative;min-height:15px;height:100%;width:100%;background-size:contain;background-repeat:no-repeat;background-image:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUxMi4wMDAwMDBwdCIgaGVpZ2h0PSI1MTIuMDAwMDAwcHQiIHZpZXdCb3g9IjAgMCA1MTIuMDAwMDAwIDUxMi4wMDAwMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLDUxMi4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiIGZpbGw9IiMwMDAwMDAiIHN0cm9rZT0ibm9uZSI+PHBhdGggZD0iTTEzNTAgNTEwNCBjLTEwMSAtMjcgLTE4OCAtMTAwIC0yMzggLTE5OSAtMjcgLTU1IC00MiAtMTQxIC00MiAtMjQ1IGwwIC04NyAtMTUwIC02IGMtMTMwIC01IC0xNjIgLTEwIC0yMzMgLTM1IC0xNDkgLTUxIC0yNjggLTE1MiAtMzQwIC0yODkgLTU1IC0xMDUgLTY3IC0xNzAgLTY3IC0zNzUgbDAgLTE3OCAyMjgwIDAgMjI4MCAwIDAgMTc1IGMwIDIwNCAtOCAyNTEgLTYyIDM2NSAtMzIgNjggLTU2IDEwMCAtMTE3IDE2MCAtMTIzIDEyMiAtMjMzIDE2NSAtNDQ4IDE3NiBsLTEyMyA3IDAgMTA3IGMwIDEyMSAtMTYgMTkxIC02MiAyNjIgLTYxIDk2IC0xNDMgMTUwIC0yNTYgMTcwIC0xNTcgMjcgLTMxNCAtNTcgLTM5MCAtMjA3IC0yNyAtNTUgLTQyIC0xNDEgLTQyIC0yNDcgbDAgLTg4IC0xODkgMCAtMTg4IDAgLTYgMTE4IGMtNyAxNDAgLTI0IDIwMCAtNzcgMjc0IC0xNjUgMjMxIC01MTAgMTk3IC02MzQgLTYyIC0yOSAtNjEgLTMxIC03MyAtMzQgLTE5NyBsLTQgLTEzMyAtMTk0IDAgLTE5NCAwIDAgMTA4IGMwIDEyMyAtMTYgMTkyIC02MiAyNjQgLTU2IDg5IC0xMzYgMTQ2IC0yMzYgMTY3IC02OCAxNCAtMTA0IDEzIC0xNzIgLTV6IG0xNTMgLTIwOCBjMzkgLTE2IDgyIC02MSA5NiAtOTkgNyAtMTggMTEgLTE2NCAxMSAtNDA4IDAgLTQxOSAwIC00MjEgLTYzIC00NzYgLTg0IC03NCAtMjAwIC00NSAtMjQ4IDYyIC0xNyAzNiAtMTkgNzMgLTE5IDQxMyAwIDMxNCAyIDM3OCAxNSA0MTAgMzkgOTMgMTI1IDEzNCAyMDggOTh6IG0xMTczIC0yMSBjNjkgLTUyIDY5IC01NSA2OSAtNDg1IDAgLTQzMCAwIC00MzMgLTY5IC00ODUgLTc2IC01OCAtMTg2IC0zNCAtMjMzIDUwIC0yMiAzOSAtMjMgNDUgLTIzIDQzMSAwIDM4OCAwIDM5MSAyMyA0MzUgNDYgODggMTU1IDExMyAyMzMgNTR6IG0xMDk3IDIxIGMzOSAtMTYgODIgLTYxIDk2IC05OSA3IC0xOCAxMSAtMTY0IDExIC00MDggMCAtNDE5IDAgLTQyMSAtNjMgLTQ3NiAtODQgLTc0IC0yMDAgLTQ1IC0yNDggNjIgLTE3IDM2IC0xOSA3MyAtMTkgNDEzIDAgMzE0IDIgMzc4IDE1IDQxMCAzOSA5MyAxMjUgMTM0IDIwOCA5OHoiLz48cGF0aCBkPSJNMjgyIDE5NDMgbDMgLTE0NzggMjEgLTU2IGM2MyAtMTYzIDE2MyAtMjc1IDMxMiAtMzQ5IDEyNyAtNjMgMzAgLTYwIDE5NDIgLTYwIDE0NjUgMCAxNzU2IDMgMTgxMiAxNCAxMzEgMjggMjY0IDExMyAzNDQgMjIwIDYxIDgwIDgxIDEyMiAxMDUgMjEzIDE4IDc0IDE5IDEyNCAxOSAxNTI1IGwwIDE0NDggLTE3NSAwIC0xNzUgMCAwIC0xNDM3IDAgLTE0MzggLTI0IC01MSBjLTEzIC0yOCAtNDEgLTY1IC02MiAtODIgLTc5IC02NiAzNCAtNjIgLTE4NDQgLTYyIC0xODg0IDAgLTE3NzEgLTQgLTE4NDcgNjMgLTIwIDE3IC00NyA1NCAtNTkgODIgbC0yNCA1MCAwIDE0MzggMCAxNDM3IC0xNzUgMCAtMTc1IDAgMiAtMTQ3N3oiLz48cGF0aCBkPSJNMTgxMCAyNzgwIGwwIC0yOTAgMzIwIDAgMzIwIDAgMCAyOTAgMCAyOTAgLTMyMCAwIC0zMjAgMCAwIC0yOTB6Ii8+PHBhdGggZD0iTTI2NzAgMjc4MCBsMCAtMjkwIDMyMCAwIDMyMCAwIDAgMjkwIDAgMjkwIC0zMjAgMCAtMzIwIDAgMCAtMjkweiIvPjxwYXRoIGQ9Ik0zNTMwIDI3ODAgbDAgLTI5MCAzMjMgMiAzMjIgMyAwIDI4NSAwIDI4NSAtMzIyIDMgLTMyMyAyIDAgLTI5MHoiLz48cGF0aCBkPSJNOTQ1IDIyODcgYy0zIC03IC00IC0xMzYgLTMgLTI4NyBsMyAtMjc1IDMyMyAtMyAzMjIgLTIgMCAyOTAgMCAyOTAgLTMyMCAwIGMtMjQ5IDAgLTMyMiAtMyAtMzI1IC0xM3oiLz48cGF0aCBkPSJNMTgxMCAyMDEwIGwwIC0yOTAgMzIwIDAgMzIwIDAgMCAyOTAgMCAyOTAgLTMyMCAwIC0zMjAgMCAwIC0yOTB6Ii8+PHBhdGggZD0iTTI2NzAgMjAxMCBsMCAtMjkwIDMyMCAwIDMyMCAwIDAgMjkwIDAgMjkwIC0zMjAgMCAtMzIwIDAgMCAtMjkweiIvPjxwYXRoIGQ9Ik0zNTMwIDIwMTAgbDAgLTI5MCAzMjMgMiAzMjIgMyAwIDI4NSAwIDI4NSAtMzIyIDMgLTMyMyAyIDAgLTI5MHoiLz48cGF0aCBkPSJNOTQwIDEyNDUgbDAgLTI4NSAzMjUgMCAzMjUgMCAwIDI4NSAwIDI4NSAtMzI1IDAgLTMyNSAwIDAgLTI4NXoiLz48cGF0aCBkPSJNMTgxMCAxMjQ1IGwwIC0yODUgMzIwIDAgMzIwIDAgMCAyODUgMCAyODUgLTMyMCAwIC0zMjAgMCAwIC0yODV6Ii8+PHBhdGggZD0iTTI2NzAgMTI0NSBsMCAtMjg1IDMyMCAwIDMyMCAwIDAgMjg1IDAgMjg1IC0zMjAgMCAtMzIwIDAgMCAtMjg1eiIvPjxwYXRoIGQ9Ik0zNTMwIDEyNDUgbDAgLTI4NSAzMjUgMCAzMjUgMCAwIDI4NSAwIDI4NSAtMzI1IDAgLTMyNSAwIDAgLTI4NXoiLz48L2c+PC9zdmc+)}.cal-hover-el-c-b{position:relative;width:100%;height:85%;padding:0 10px 10px}.cal-hover-el-c-b-c{position:relative;width:100%;height:100%;display:flex;display:-webkit-flex;flex-direction:column;align-items:center;justify-content:space-around}.cal-hover-el-c-b-c>h1{width:100%;font-size:1.2em;font-weight:600;text-align:left;color:var(--el-color)!important}.cal-hover-el-c-b-c>div{position:relative;width:100%}.cal-hover-el-c-b-c>div h2{width:100%;font-size:1.1em;font-weight:400;margin-bottom:10px;color:#8e9cc9;text-align:left}.cal-hover-el-c-b-c>div h3{width:100%;font-size:1em;font-weight:600;color:#babdd4;text-align:left}.cal-hover-el-c-b-c>div h3 span.strong{color:#8f91a3}.cal-hover-el-c-b-c>div{display:flex;display:-webkit-flex;flex-direction:column;align-items:center}.planning-bg-grid{position:absolute;z-index:-1;top:200px;left:15%;width:350px;height:350px}.planning-bg-grid svg circle{fill:#c3d2e3}.pl-sc{position:relative;width:60%;background-color:#f8f9ff;border-radius:25px;box-shadow:none;padding:30px 50px 30px}.calendar-week-day{position:relative;width:100%;height:100%;display:flex;display:-webkit-flex;flex-direction:column;justify-content:space-between;align-content:center}.day-el{position:relative;width:100%;display:flex;display:-webkit-flex;flex-direction:column;align-items:flex-start;padding:20px 0 0}.day-dt,.day-tt{position:relative;display:flex;display:-webkit-flex;flex-direction:row;align-items:center}.day-end,.day-start{font-family:Quicksand-SemiBold,sans-serif;font-weight:900}.day-dt,.day-end,.day-name,.day-numb,.day-start,.month-name{padding:5px}.day-tt h1{font-size:var(--txt-corps);font-weight:900;text-align:left}.day-tt:before{content:"";position:absolute;left:5px;right:5px;bottom:3px;height:1px;background:currentColor}.curr-day .day-dt h1{font-family:Quicksand-SemiBold,sans-serif;font-weight:700;color:#e64826!important}@media screen and (max-width:1300px){.planning-root{position:relative;height:min-content;width:80%}}@media screen and (max-width:900px) and (min-width:600px){.planning-root{width:85%!important;overflow-x:scroll}.cal-grid-bd,.cal-top{width:900px}}@media screen and (max-width:1000px){.pl-sc{width:85%}.planning-info{width:85%!important}.planning-root{position:relative;height:min-content;width:90%}.day-evtt{font-size:.9em;font-weight:900}.day-evds{font-size:.8em}}@media screen and (max-width:600px){.pl-sc{position:relative;width:95%;padding:20px 15px 20px}.day-dt p{font-size:1.1em}.day-info{padding-top:10%}}@media screen and (max-width:350px){.pl-sc{position:relative;width:95%;padding:20px 15px 20px}.day-dt p{font-size:1em}.day-info{padding-top:10%}.day-info p{font-size:.8em}.curr-day .day-dt h1{font-size:1.3em}.day-evtt{font-size:.8em}.day-evds{font-size:.6em}}.planning-info{position:relative;width:60%;height:100px;padding:10px}.planning-blue ::before,.planning-blue h1,.planning-blue p{color:var(--planning-blue)}.planning-info .day-info-ico{width:30px;padding:0 20px 0 0}.planning-info .day-info-ico>svg{position:relative;width:20px;height:20px}.planning-info .day-name{display:flex;display:-webkit-flex;flex-direction:row;align-items:center}.planning-info .day-name>p{font-size:1.2em;font-weight:400}.planning-info .day-el{flex-direction:row}.pln-btm-hd{position:relative;width:100%;height:80vh}@media screen and (max-width:750px){.planning-c-tt{width:90%}.planning-info{width:90%;padding:0;height:auto;margin-top:0}.planning-info .day-name>p{font-size:1em}}.white-scheme .pr-burger div,.white-scheme .tb-sch-ttname{color:#fff!important}.pnc-c.white-scheme a,.pnc-c.white-scheme h1,.pnc-c.white-scheme p{color:#fff!important}.white-scheme .tab-bar a,.white-scheme .tab-bar h1,.white-scheme .tab-bar p{color:#fff!important}.error-handl{color:red;font-size:1em;background-color:#fff;padding:40px 0}']}