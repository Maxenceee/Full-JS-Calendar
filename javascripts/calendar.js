/*!






 __  __                                                  ____                             
|  \/  |   __ _  __  __   ___   _ __     ___    ___     / ___|   __ _   _ __ ___     __ _ 
| |\/| |  / _` | \ \/ /  / _ \ | '_ \   / __|  / _ \   | |  _   / _` | | '_ ` _ \   / _` |
| |  | | | (_| |  >  <  |  __/ | | | | | (__  |  __/   | |_| | | (_| | | | | | | | | (_| |
|_|  |_|  \__,_| /_/\_\  \___| |_| |_|  \___|  \___|    \____|  \__,_| |_| |_| |_|  \__,_|
    





*/

!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Calendar = e()
}(this, (function() {
    "use strict";
    const Gs = new Map,
        Zs = new Set;
    function Js(t, e) {
        let i = Gs.get(t);
        return i || (i = e(), Gs.set(t, i), Zs.add(i)), i
    }
    const Qs = (t, e, i) => {
        const s = ct(e, i);
        void 0 !== s && t.add(s)
    };
    const Ks = (a) => {
        a.lang = a.lang || "en"
        return a
    }
    const Ns = (a) => {
        for(var i = 0; i < a.length; i++) {
            let e = a[i];
            e.dayc = e.dayc.sort(function(a, b) { 
                return a.start - b.start;
            });
        }
        return a
    }
    class tn {
        constructor(t)
        {
            if (!t.data)
                throw Error("Missing data, make sure to add data first.");
            this._config = function(t) {
                return (t = t || {}).options = Ks(t.options) || {}, t.data = Ns(t.data), t
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
            col: b.col || {
                major: "#7751d9",
                minor: "#eee8ff"
            },
            prv: b.prv || {
                major: "#2eb3e4",
                minor: "#e2f4ff"
            }
        }
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
            const s = this.config = new tn(e);
            this.options = s._config.options,
            this.root = t,
            this.daysName = {long: {"en": ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                                    "fr": ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']},
                            short: {"en": ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                                    "fr": ['L', 'M', 'M', 'J', 'V', 'S', 'D']}}
            wK(this.options);
            tK(this.options);

            var u = this.configure(this.options);
            this.grid = new Grid(t, u, s.data).drawGrid();
        }
        configure(a) {
            a && (a.days = this.langDay(), a.dayslong = this.langLongDay(), a.ages = this.ages(), a.levels = this.levels(), a.courses = this.courses(), a.uniHeight = this.uniHeight(), a.availability = this.availability(), a.textOptions = this.textOptions())
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
            return this.lang_sel({"en": ["All ages", "Child", "Teen", "Adult"], "fr": ["Tout âge", "Enfant", "Ado", "Adulte"]}, this.options.lang)
        }
        levels() {
            return this.lang_sel({"en": ["All levels", "Beginner", "Intermediate", "Advanced"], "fr": ["Tous niveaux", "Débutant", "Intermédiaire", "Confirmé"]}, this.options.lang)
        }
        courses() {
            return this.lang_sel({"en": ["Collective course", "Private course"], "fr": ["Cours collectif", "Cours privé"]}, this.options.lang)
        }
        availability() {
            return this.lang_sel({"en": ["Actuellement disponible", "Actuellement indisponible"], "fr": ["Actuellement disponible", "Actuellement indisponible"]}, this.options.lang)
        }
        textOptions() {
            return this.lang_sel({"en": ["Start", "End", "Duration", "Level", "Age"], "fr": ["Début", "Fin", "Durée", "Niveau", "Age"]}, this.options.lang)
        }
        uniHeight() {
            return size() > 600 ? 100 : 50
        }
        error() {
            return this.lang_sel({"en": "An error occurred while loading the schedule, please try again later.", "fr": "Une erreur s'est produite lors du chargement du planning, veuillez réessayer ultérieurement."}, this.options.lang)
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
        // _.gridB(content, w, b)
    };
    g.gridBody = function(w) {
        let a = Me("div", "cal-grid-bd scroll-shadow-btm"),
            b = Me("div", "cal-grid-bd-c"),
            c = Me("div", "cal-grid-bd-cp"),
            l = Me("div", "cal-grid-lp"),
            r = Me("div", "cal-grid-rp"),
            s = Me("div", "cal-grid-rp-c"),
            st = 8,
            timeSet = this.options.timeSet,
            start = (timeSet.start >= 0 ? timeSet.start : 0),
            end = (timeSet.end < 24 ? timeSet.end : 23),
            duration = end-start+2,
            days = 7;
        (duration < 24 || (duration = 23));

        datesColumn(l, st, duration, timeSet, this), gridPatern(s, days, duration, timeSet, this), scrollShadow(b, a);

        Md(this.root, Md(a, Md(b, Md(c, [l, Md(r, s)]))));
        
        size() < 600 && this.gridGrow("cal-tp-day", "cal-grid-el-pr", this.td);
    
        // _.desktop() ? _.deskFpopup() : _.mobFpopup();
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
        Ms(Mq(document, ".cal-tp-mob-day-btn.cal-btn-left"), "curr-sel", i);
        Ms(Mq(document, ".cal-tp-mob-day-btn.cal-btn-right"), "curr-sel", i);
    }
    g.resizeEvent = function() {
        console.log("rr");
        this.standardViewportWidth = window.innerWidth,
        this.revent = new CalEvents(["resize"], window, this.gridresize.bind(this));
        console.log(this.revent);
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
        for(var x = 0; x < o; x+=p.gap) {
            let dn = Me("div", "cal-grid-dn"),
                dt = Me("p", "cal-grid-dn-t", x>0 && {in: ((m+x-1 >= 10 ? m+x-1 : '0'+(m+x-1)) + ":00")});
            
            dn.style.height = q.options.uniHeight+"px";
            Md(n, Md(dn, dt));
        }
    },
    gridPatern = function(n, m, o, p, q) {
        for(var y = 0; y < m; y++) {
            let d = Me("div", "cal-grid-el-pr"),
                un = Me("div", "cal-line-r-c"),
                s = size() > 600;
            Ms(d, "cal-line-index", y);

            linePatern(o, p, q, d);
            q.data.length && (createEvents(q, un, q.data[y], getElementsIndex(q.data[y].dayc, s)))
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
    createEvents = function(a, b, c, d) {
        let t = Days(a.today),
            n = a.events = [],
            m = c.dayc;
        for(var i = 0; i < m.length; i++) {
            let evt = new Event(b, a, m[i], c.dayid, t, i);
            evt.drawEvent(d[i]);
            Md(b, evt.grt());
            new Popup(a, evt.grt(), m[i]);
            n.push(evt);
        }
        // console.log(n);
    },
    mobSlidingDay = (a, b) => {
        let index = parseInt(Mq(document, ".cal-tp-day.selected-day").getAttribute("day")) + (b === 0 ? -1 : 1);
        a.gridGrow("cal-tp-day", "cal-grid-el-pr", index);
    }

    var Event = function(a, b, c, d, e, f) {
        this.t = e,
        this.root = a,
        this.container = b,
        this.options = b.options,
        this.height = b.options.uniHeight,
        this.content = c,
        this.id = d,
        this.y = f,
        this.element = Me("div", "cal-grid-rdv-el");
    };
    var e = Event.prototype;
    e.grt = function() {
        return this.element
    };
    e.drawEvent = function(a) {
        // console.log(this.content);
        let e = this.options,
            f = this.content,
            t = this.height,
            n = this.element,
            m = Me("div", "cal-grid-rdv-el-in"),
            o = Me("div"),
            w = Me("div"),
            x = this.root,
            topPlacement = this.eventTopOffset(f),
            startOff = this.eventOffset(f, this.height),
            lengthrdv = this.eventLength(f),
            lm = Me("h3", "cal-r-tt", {in: e.courses[f.txt]});
        Md(o, lm),
        this.addDetails(lengthrdv, f, w, lm, o),
        Md(o, inn(f)),
        this.addPropreties(f, lengthrdv, topPlacement, startOff, t, a),
        Md(n, Md(m, o)),
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
    e.eventTopOffset = function(a) {
        return parseInt(a.start.slice(0, 2)) - 7
    };
    e.eventOffset = function(a, b) {
        return (b / 60 * parseInt(a.start.slice(2)))
    };
    e.eventLength = function(a) {
        return ((parseInt(a.end.slice(0, 2))) - (parseInt(a.start.slice(0, 2))) - (parseInt(a.start.slice(2)) / 60 * 1) + (parseInt(a.end.slice(2)) / 60 * 1));
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
            Mc(c, "cal-el-r-mob-info"),
            c.innerHTML = '<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="512px" height="512px"><path d="M 64 6 C 32 6 6 32 6 64 C 6 96 32 122 64 122 C 96 122 122 96 122 64 C 122 32 96 6 64 6 z M 64 12 C 92.7 12 116 35.3 116 64 C 116 92.7 92.7 116 64 116 C 35.3 116 12 92.7 12 64 C 12 35.3 35.3 12 64 12 z M 64 30 A 9 9 0 0 0 64 48 A 9 9 0 0 0 64 30 z M 64 59 C 59 59 55 63 55 68 L 55 92 C 55 97 59 101 64 101 C 69 101 73 97 73 92 L 73 68 C 73 63 69 59 64 59 z"/></svg>',
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
            throw Error("Two color arguments are required, "+n+".minor and "+n+".major.")
        return m[c ? "major" : "minor"]
    },
    stringToTimeMin = (a) => {
        if (typeof a === 'number') return a
        var b = parseInt(a.slice(0, 2)) * 60,
            c = parseInt(a.slice(2));
        return b+c
    }

    var getElementsIndex = function(a, n) {
        var b = [],
            res = {},
            l = 100,
            j = n ? 20 : 50,
            h = 10,
            g
    
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
    
            res = {index: i, size: size, offset: offset, object: e};
            b.push(res);
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
        this.caller = null;
        a && this.dispatchEvent(...arguments);
    }
    var ce = CalEvents.prototype;
    ce.dispatchEvent = function(a, b, c) {
        let d = this.event;
        if (d) {
            throw Error("Event already exist");
        }
        this.caller = b;
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
            this.caller.removeEventListener(this.name[i], this.event);
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
            b = Me("div", "cal-mob-pop-box-cnt"),
            c = Me("div", "cal-mob-pop-close"),
            n = oppb();
        Ms(c, "id", "cal-mob-pop-close-btn");
        a.onclick = (e) => {
            if (e.target === c || e.target === a) {
                Mr(t, "-pop-active"), a.remove();
            }
        }
        Md(a, Md(b, [c, n.x]));
        return {m: a, t: n.t, b: n.b}
    },
    oppb = function() {
        let a = Me("div", "cal-hover-el"),
            b = Me("div", "cal-hover-el-c-t"),
            c = Me("div", "cal-hover-el-c-b"),
            d = Me("div", "cal-hover-el-c");
        return {m: Md(a, Md(d, [b, c])), x: Md(d, [b, c]), t: b, b: c}
    },
    jhover = (u, v) => {
        let t = u.getAttribute('el-date') + '-'+ (parseInt(u.getAttribute('el-date')) < v.getDate() ? v.getMonth()+2 : v.getMonth()+1),
            rt = Me("div", "cal-hover-el-c-t-c", {in: '<div><svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M1350 5104 c-101 -27 -188 -100 -238 -199 -27 -55 -42 -141 -42 -245 l0 -87 -150 -6 c-130 -5 -162 -10 -233 -35 -149 -51 -268 -152 -340 -289 -55 -105 -67 -170 -67 -375 l0 -178 2280 0 2280 0 0 175 c0 204 -8 251 -62 365 -32 68 -56 100 -117 160 -123 122 -233 165 -448 176 l-123 7 0 107 c0 121 -16 191 -62 262 -61 96 -143 150 -256 170 -157 27 -314 -57 -390 -207 -27 -55 -42 -141 -42 -247 l0 -88 -189 0 -188 0 -6 118 c-7 140 -24 200 -77 274 -165 231 -510 197 -634 -62 -29 -61 -31 -73 -34 -197 l-4 -133 -194 0 -194 0 0 108 c0 123 -16 192 -62 264 -56 89 -136 146 -236 167 -68 14 -104 13 -172 -5z m153 -208 c39 -16 82 -61 96 -99 7 -18 11 -164 11 -408 0 -419 0 -421 -63 -476 -84 -74 -200 -45 -248 62 -17 36 -19 73 -19 413 0 314 2 378 15 410 39 93 125 134 208 98z m1173 -21 c69 -52 69 -55 69 -485 0 -430 0 -433 -69 -485 -76 -58 -186 -34 -233 50 -22 39 -23 45 -23 431 0 388 0 391 23 435 46 88 155 113 233 54z m1097 21 c39 -16 82 -61 96 -99 7 -18 11 -164 11 -408 0 -419 0 -421 -63 -476 -84 -74 -200 -45 -248 62 -17 36 -19 73 -19 413 0 314 2 378 15 410 39 93 125 134 208 98z"/><path d="M282 1943 l3 -1478 21 -56 c63 -163 163 -275 312 -349 127 -63 30 -60 1942 -60 1465 0 1756 3 1812 14 131 28 264 113 344 220 61 80 81 122 105 213 18 74 19 124 19 1525 l0 1448 -175 0 -175 0 0 -1437 0 -1438 -24 -51 c-13 -28 -41 -65 -62 -82 -79 -66 34 -62 -1844 -62 -1884 0 -1771 -4 -1847 63 -20 17 -47 54 -59 82 l-24 50 0 1438 0 1437 -175 0 -175 0 2 -1477z"/><path d="M1810 2780 l0 -290 320 0 320 0 0 290 0 290 -320 0 -320 0 0 -290z"/><path d="M2670 2780 l0 -290 320 0 320 0 0 290 0 290 -320 0 -320 0 0 -290z"/><path d="M3530 2780 l0 -290 323 2 322 3 0 285 0 285 -322 3 -323 2 0 -290z"/><path d="M945 2287 c-3 -7 -4 -136 -3 -287 l3 -275 323 -3 322 -2 0 290 0 290 -320 0 c-249 0 -322 -3 -325 -13z"/><path d="M1810 2010 l0 -290 320 0 320 0 0 290 0 290 -320 0 -320 0 0 -290z"/><path d="M2670 2010 l0 -290 320 0 320 0 0 290 0 290 -320 0 -320 0 0 -290z"/><path d="M3530 2010 l0 -290 323 2 322 3 0 285 0 285 -322 3 -323 2 0 -290z"/><path d="M940 1245 l0 -285 325 0 325 0 0 285 0 285 -325 0 -325 0 0 -285z"/><path d="M1810 1245 l0 -285 320 0 320 0 0 285 0 285 -320 0 -320 0 0 -285z"/><path d="M2670 1245 l0 -285 320 0 320 0 0 285 0 285 -320 0 -320 0 0 -285z"/><path d="M3530 1245 l0 -285 325 0 325 0 0 285 0 285 -325 0 -325 0 0 -285z"/></g></svg></div><h4>'+ t + '</h4>'})
        return rt
    },
    fhover = (n, m, o) => {
        let t = m,
            a = Me("h1", "cal-tp-day-tt", {in: t.courses[n.txt]}),
            b = Me("h2", "cal-tp-day-tt", {in: t.availability[n.isAvailable]}),
            c = Md(Me("h3"), [Me("span", "", {in: t.textOptions[0]+": "}), Me("span", "", {in: ((o.dates.sh < 10 && "0") + o.dates.sh)+":"+((o.dates.sm < 10 && "0") + o.dates.sm)})]),
            d = Md(Me("h3"), [Me("span", "", {in: t.textOptions[1]+": "}), Me("span", "", {in: ((o.dates.eh < 10 && "0") + o.dates.eh)+":"+((o.dates.em < 10 && "0") + o.dates.em)})]),
            e = Md(Me("h3"), [Me("span", "", {in: t.textOptions[2]+": "}), Me("span", "", {in: (o.h >= 1 ? (o.h +'h'+ (o.m ? o.m : '')) : (o.m + 'mins'))})]),
            f = Md(Me("h3"), [Me("span", "", {in: t.textOptions[3]+": "}), Me("span", "", {in: t.levels[n.level+1 || 0]})]),
            g = Md(Me("h3"), [Me("span", "", {in: t.textOptions[4]+": "}), Me("span", "", {in: t.ages[n.age+1 || 0]})]);

        a.style.color = dl(t.colorsTheme, n.txt, 0)+'!important;'
        b.style.color = !t.isAvailable ? "#E64826" : "#18BEC9";
        return Md(Me("div", "cal-hover-el-c-b-c"), [a, Md(Me("div"), [b, c, d, e, f, g])]);
    },
    coor = function(a, b, c, d) {
        return a ? b.clientX < c.left + c.width - (d.width + 10) ? 10 : - (d.width) : b.clientX < c.left + c.width/2 ? 10 : - (d.width)
    },
    trs = function(a, b, c, d) {
        a.style.transform = 'translate('+ (b.clientX + c) +'px, '+ (b.clientY + d) +'px)';
    }
    
    return fn.Calendar = fn, "undefined" != typeof window && (window.Calendar = fn), fn
}));