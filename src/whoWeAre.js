function textFor() {
    let $text = ($(`<div class="container" id="weare">`));
    ($(`<h2>WHO ARE WE?</h2>`)).appendTo('#weare');
    ($(`<p>Эскалатор. В детстве я долго не могла выучить как правильно пишется это слово и какими буквами отличается от «экскаватор». Сейчас же иногда, когда я подхожу к нему, вспоминается мой странный сон, в котором эскалаторы превратились в сплошные горки, градус наклона которых пугал детский разум. </p>`)).appendTo('#weare');
    ($(`<p>И вот так спускаешься ты каждый раз вниз по нему, смотришь в глаза людей напротив и думаешь о чём-то своем. Спустился на станцию в метро, стоишь возле туннеля. Дует ветер, а в ушах звук чего-то приближающегося. Неизвестно чего и зачем. Мимо на полной скорости проносится поезд и под конец его остановки у тебя ощущение что едешь не он, а ты. </p>`)).appendTo('#weare');
    ($(`<p>Заходишь внутрь и обнаруживаешь себя в заброшенном и чужом районе Парижа. Индианка с мужем, снаружи бомжи что-то делают под дверью в туннель, приглушённый старый свет в вагоне и парочку местных модников, включая тебя, которые явно случайно здесь оказались. </p>`)).appendTo('#weare');
    ($(`<p>А ты даже и не покидал Киев.</p><br>`)).appendTo('#weare');
    ($(`<p>Поэтому спускайтесь в киевское метро, включайте свой любимый плейлист и направляйтесь на станцию метро "Контрактовая". На углу Спасской вы найдете нашу оффлайн точку, а по пути сможете загялнуть в Espresso Holic, лучшие чизкейки во всём Киеве продаются именно там.</p><br>`)).appendTo('#weare');
    return $text;
}

module.exports = textFor;