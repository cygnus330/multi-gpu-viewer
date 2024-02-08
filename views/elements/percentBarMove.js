function make(leftL, rightL, barId) {
    function length(trace, time) {
        return trace.v0 * time + 0.5 * trace.a * time * time;
    }

    function calcBar(len_a, len_b) {
        if(len_a + len_b >= 100) {
            len_bar[1] = (len_a + len_b) - 100;
            len_bar[0] = 100 - len_b;
            len_bar[2] = 100 - len_a;
            col_bar = [1, 3, 2];
        } else {
            len_bar[1] = 100 - (len_a + len_b);
            len_bar[0] = len_a;
            len_bar[2] = len_b;
            col_bar = [1, 0, 2];
        }

        return [len_bar, col_bar];
    }

    var end_time = 1.0;
    var refresh_time = 1 / 240;
    var now_time = 0;

    var trace_a = {
        v0: 2.0 * leftL / end_time,
        a: -2.0 * leftL / (end_time * end_time)
    };
    var trace_b = {
        v0: 2.0 * rightL / end_time,
        a: -2.0 * rightL / (end_time * end_time)
    };
    var bars = [document.getElementById('bar' + barId + '_a'), document.getElementById('bar' + barId + '_c'), document.getElementById('bar' + barId + '_b')];
    var num_a = document.getElementById('bar' + barId + '_ap');
    var num_b = document.getElementById('bar' + barId + '_bp');
    var len_a = 0;
    var len_b = 0;
    var len_bar = [0, 0, 0];
    var col_bar = [1, 0, 2]; // 0: background, 1: bar_a, 2: bar_b, 3: mixed
    var colors = ['gray', 'green', 'pink', 'yellow'];

    var id = setInterval(refresh, 1000 * refresh_time);
    function refresh() {
        if(end_time <= now_time) {
            num_a.innerHTML = leftL + '%';
            num_b.innerHTML = parseInt(rightL) * 48 / 100 + 'GB / 48 GB';
            clearInterval(id);
        } else {
            now_time += refresh_time;
            len_a = length(trace_a, now_time);
            len_b = length(trace_b, now_time);

            num_a.innerHTML = parseInt(len_a) + '%';
            num_b.innerHTML = parseInt(len_b) * 48 / 100 + 'GB / 48 GB';

            [len_bar, col_bar] = calcBar(len_a, len_b);
            for(var i = 0; i < 3; i++) {
                bars[i].style.width = len_bar[i] + '%';
                bars[i].style.backgroundColor = colors[col_bar[i]];
            }
        }
    }
}