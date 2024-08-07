import { html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";


// Define the rendering function
export function renderIn(c) {
    // Render the HTML template using the provided object `c`
    const htmlTemplate = html`
    <style>
        .card { position: relative; overflow: hidden; padding: 16px 16px 20px; font-weight: 400; border-radius: var(--ha-card-border-radius, 10px); }
        .title { text-align: center; font-size: 1.2em; font-weight: 500; }
        .team-bg { opacity: 0.08; position: absolute; top: -20%; left: -20%; width: 58%; z-index: 0; }
        .opponent-bg { opacity: 0.08; position: absolute; top: -20%; right: -20%; width: 58%; z-index: 0; }
        .card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 1; }
        .team { text-align: center; width: 35%; }
        .team img { max-width: 90px; }
        .logo { max-height: 6.5em; }
        .circle { display:${c.initialsDisplay}; width: 1em; height: 1em; padding: 10px; line-height: 3em; border: 2px solid gray; border-radius: 50%; font-size: 2em; color: white; text-align: center; background: black }
        .possession, .possession1, .possession2 { font-size: 2.5em; text-align: center; opacity: 0; font-weight:900; }
        .possession1 {opacity: ${c.possessionOp[1]} !important; }
        .possession2 {opacity: ${c.possessionOp[2]} !important; }
        .score { font-size: ${c.scoreSize}; text-align: center; }
        .divider { font-size: 2.5em; text-align: center; margin: 0 4px; }
        .name { font-size: 1.4em; margin-bottom: 4px; }
        .rank { font-size:0.8em; display: ${c.rankDisplay}; }
        .record { font-size:1.0em; height 1.0em; }
        .line1 { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
        .line2 { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
        .timeouts { margin: 0.4em auto; width: 70%; display: ${c.timeoutsDisplay}; }
        .timeouts div.timeouts2:nth-child(-n + ${c.timeouts[2]})  { opacity: 1; }
        .timeouts div.timeouts1:nth-child(-n + ${c.timeouts[1]})  { opacity: 1; }
        .timeouts1 { height: 0.6em; border-radius: 0.3em; border: ${c.clrOut}px solid ${c.outColor}; width: 20%; background-color: ${c.color[1]}; display: inline-block; margin: 0.4em auto; position: relative; opacity: 0.2; }
        .timeouts2 { height: 0.6em; border-radius: 0.3em; border: ${c.clrOut}px solid ${c.outColor}; width: 20%; background-color: ${c.color[2]}; display: inline-block; margin: 0.4em auto; position: relative; opacity: 0.2; }
        .bases { font-size: 2.5em; text-align: center; font-weight:900; display: ${c.basesDisplay};}
        .on-first { opacity: ${c.onFirstOp}; display: inline-block; }
        .on-second { opacity: ${c.onSecondOp}; display: inline-block; }
        .on-third { opacity: ${c.onThirdOp}; display: inline-block; }
        .pitcher { opacity: 0.0; display: inline-block; }
        .in-series-info { display:${c.seriesSummaryDisplay}; font-size: 1.2em; text-align: center; margin: 4px; }
        .in-row1 { font-size: 1em; height: 1em; margin: 6px 0 2px; }
        .in-row2 { ; font-size: 1em; height: 1em; margin: 6px 0 2px; }
        .in-row1, .in-row2 { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
        .last-play { font-size: 1.2em; width: 100%; white-space: nowrap; overflow: hidden; box-sizing: border-box; }
        .last-play p { display: inline-block; padding-left: 100%; margin: 2px 0 12px; animation : slide ${c.lastPlaySpeed}s linear infinite; }
        @keyframes slide { 0%   { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
        .down-distance { text-align: right; }
        .play-clock { font-size: 1.4em; height: 1.4em; text-align: center; }
        .outs { text-align: center; display: ${c.outsDisplay}; }
        .bar-text { text-align: center; display: ${c.barDisplay}; }
        .bar-flex { width: 100%; display: flex; justify-content: center; margin-top: 4px; }
        .bar2-length { width: ${c.barLength[2]}%; background-color: ${c.color[2]}; height: 0.8em; border-radius: 0 0.4em 0.4em 0; border: ${c.clrOut}px solid ${c.outColor}; border-left: 0; transition: all 1s ease-out; }
        .bar1-length { width: ${c.barLength[1]}%; background-color: ${c.color[1]}; height: 0.8em; border-radius: 0.4em 0 0 0.4em; border: ${c.clrOut}px solid ${c.outColor}; border-right: 0; transition: all 1s ease-out; }
        .bar { display: ${c.barWrapDisplay}; align-items: center; }
        .bar1-label { flex: 0 0 10px; padding: 0 10px 0 0; margin-top: 4px; }
        .bar2-label { flex: 0 0 10px; padding: 0 0 0 10px; text-align: right; margin-top: 4px; }
        .left-clickable { text-decoration: none; color: inherit; }
        .right-clickable { text-decoration: none; color: inherit; }
        .bottom-clickable { text-decoration: none; color: inherit; }
        .disabled { pointer-events: none; cursor: default; }
    </style>
    <ha-card>
        <div class="card">
            <div class="title">${c.title}</div>
            <img class="team-bg" src="${c.logoBG[1]}" />
            <img class="opponent-bg" src="${c.logoBG[2]}" />
            <div class="card-content">
                <div class="team">
                <a class="left-clickable ${!c.url[1] ? 'disabled' : ''}" href="${c.url[1] ? c.url[1] : '#'}" target="_blank">
                    <img class="logo" src="${c.logo[1]}" onerror="this.onerror=null; this.src='${c.logoError[1]}';" />
                    <div class="circle">${c.initials[1]}</div>
                    <div class="name"><span class="rank">${c.rank[1]}</span> ${c.name[1]}</div>
                    <div class="record">${c.record[1]}</div>
                    <div class="timeouts">
                        <div class="timeouts1"></div>
                        <div class="timeouts1"></div>
                        <div class="timeouts1"></div>
                    </div>
                    </a>
                </div>
                <div class="possession1">&bull;</div>
                <div class="score">${c.score[1]}</div>
                <div class="divider">&nbsp&nbsp&nbsp</div>
                <div class="score">${c.score[2]}</div>
                <div class="possession2">&bull;</div>
                <div class="team">
                    <a class="right-clickable ${!c.url[2] ? 'disabled' : ''}" href="${c.url[2] ? c.url[2] : '#'}" target="_blank">
                    <img class="logo" src="${c.logo[2]}" onerror="this.onerror=null; this.src='${c.logoError[2]}';" />
                    <div class="circle">${c.initials[2]}</div>
                    <div class="name"><span class="rank">${c.rank[2]}</span> ${c.name[2]}</div>
                    <div class="record">${c.record[2]}</div>
                    <div class="timeouts">
                        <div class="timeouts2"></div>
                        <div class="timeouts2"></div>
                        <div class="timeouts2"></div>
                    </div>
                    </a>
                </div>
            </div>
            <div class="play-clock">${c.playClock}</div>
            <div class="bases">
                <div class="on-second">&bull;</div>
            </div>
            <div class="bases">
                <div class="on-third">&bull;</div>
                <div class="pitcher"></div>
                <div class="on-first">&bull;</div>
            </div>
            <div class="outs">${c.in0}</div>
            <div class="in-series-info">${c.seriesSummary}</div>
            <div class="line1"></div>
            <a class="bottom-clickable ${!c.bottomURL ? 'disabled' : ''}" href="${c.bottomURL ? c.bottomURL : '#'}" target="_blank">
                <div class="in-row1">
                    <div class="venue">${c.venue}</div>
                    <div class="down-distance">${c.in1}</div>
                </div>
                <div class="in-row2">
                    <div class="location">${c.location}</div>
                    <div class="network">${c.in2}</div>
                </div>
                <div class="line2"></div>
                <div class="last-play">
                    <p>${c.lastPlay}</p>
                </div>
                <div class="bar-wrapper">
                    <div class="bar-text">${c.gameBar}</div>
                    <div class="bar">
                        <div class="bar1-label">${c.barLabel[1]}</div>
                        <div class="bar-flex">
                            <div class="bar1-length"></div>
                            <div class="bar2-length"></div>
                        </div>
                        <div class="bar2-label">${c.barLabel[2]}</div>
                    </div>
                </div>
            </a>
        </div>
    </ha-card>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('a.disabled').forEach(function(link) {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                });
            });
        });
    </script>
    `;    // Return the HTML template
    return htmlTemplate;
}