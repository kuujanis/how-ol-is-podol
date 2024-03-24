import styles from './description.module.css'
import React, {useEffect, useState} from 'react'
import { useInView } from "react-intersection-observer";

export const Description = (props) => {

    const [current,setCurrent] = useState('title');

    const showTab = (tab) => {
        setCurrent(tab);
		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: "smooth" });
    }

    //tab change on scroll
    const [titleRef, inViewTitle] = useInView({threshold: 0})
    const [merchantRef, inViewMerchant] = useInView({threshold: 0});
    const [zingerRef, inViewZinger] = useInView({threshold: 0});
    const [leninRef, inViewLenin] = useInView({threshold: 0});
    const [stalinRef, inViewStalin] = useInView({threshold:0})
    const [hrushevRef, inViewHrushev] = useInView({threshold:0})
    const [stagnationRef, inViewStagnation] = useInView({threshold:0})
    const [zeroesRef, inViewZeroes] = useInView({threshold:0})
    const [todayRef, inViewToday] = useInView({threshold:0})

    const selectEpoque = (epoque, min, max) => {
        setCurrent(epoque);
        props.setMinYear(min);
        props.setMaxYear(max)
    }

    useEffect(() => {
        if (inViewTitle) {
            selectEpoque('title', 1698, 2024)
        } else if (inViewMerchant) {
            selectEpoque('merchant',1698,1870)
        } else if (inViewZinger) {
            selectEpoque('zinger',1871,1920)
        } else if (inViewLenin) {
            selectEpoque('lenin',1921,1942)
        } else if (inViewStalin) {
            selectEpoque('stalin',1943,1957)
        } else if (inViewHrushev) {
            selectEpoque('hrushev',1958,1972)
        } else if (inViewStagnation) {
            selectEpoque('stagnation',1973,1992)
        } else if (inViewZeroes) {
            selectEpoque('zeroes',1993,2013)
        } else if (inViewToday) {
            selectEpoque('today',2014,2024)
        }        
      }, [inViewMerchant, inViewZinger, inViewLenin, inViewStalin, inViewHrushev, inViewStagnation, inViewZeroes, inViewToday]);
    

    const activateMap = () => {
        props.setDescriptionActive(false)
        props.setMinYear(1698)
        props.setMaxYear(2024)
    }

    return (
        <section className={styles.descolumn}>
            <div className={styles.scrolldiv}>
                <div ref={titleRef} className={styles.titlediv}>
                    <h1 id='title'>HoW OL' IS PoDoL</h1>
                    <p>
                        How ol' is Podol - это энтузиастский проект, целью которого является изучение городской среды
                        Подольска. <span onClick={() => props.setDescriptionActive(false)}>Активировать карту.</span>
                    </p>

                </div>
                {/* <div>
                    <h1>Село Подол</h1>
                    <h2>До 1781</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>Менее 1% современной застройки</span>
                    <p>
                        До получения городских прав Подол представлял собой небольшое село, 
                        возникшее вокруг ямской станции Варшавского Тракта. Его единственным каменным сооружением являлась 
                        сохранившаяся до наших дней церковь Воскресения Словущего, стоящая на крутом берегу Пахры.
                        За пределами будущего города начиналась бесскрайняя среднерусская пастораль, владение
                        московских дворянских семейств. Их фамильные усадьбы ныне оказались в черте города и дали названия 
                        некоторым его районам.
                    </p>
                    <h3>Характерные строения:</h3>
                    <ul>
                        <li>Церковь Воскресения Словущего</li>
                        <li>Знаменская Церковь в Дубровицах</li>
                        <li>Усадьба Голицыно</li>
                    </ul>
                    <h3>Стили: Барокко, Готика, Ярославская школа</h3>
                    <h3>Районы: Дубровицы</h3>
                </div> */}
                <div ref={merchantRef}>
                    <h1 id='merchant'>Купеческий город</h1>
                    <h2>1781-1871</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>Менее 1% современной застройки</span>
                    <p>
                        Статус города позволил жителям Подольска активнее заниматься торговлей и ремеслами. 
                        В городе развивались мануфактуры и мелкие заводы, открывались шахты.
                        На пожертвования мещан был построен Собор Троицы Живоначальной, открыты первое училище и больница.
                        В это время Подольск стал родиной множества купеческих фамилий. Лавки и трактиры подольских купцов 
                        и сегодня украшают центральные улицы города.
                    </p>
                    <h3>Характерные строения:</h3>
                    <ul>
                        <li>Собор Троицы Живоначальной</li>
                        <li>Тюремный Замок</li>
                        <li>Дом купца Кананыкина</li>
                    </ul>
                    <h3>Стили: Классический</h3>
                    <h3>Районы: Центральный</h3>
                </div>
                <div ref={zingerRef}>
                    <h1 id='zinger'>Промышленный город</h1>
                    <h2>1871-1921</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>3% современной застройки</span>
                    <p>
                        В 1866 году через Подольск прошла линия Московско-Курской железной дороги. По её рельсам
                        в город пришел крупный капитал. В 1871 "Пороховщиков и Ко" выстроили на богатом известняком
                        левом берегу Пахры цементный завод, давший начало новому району города - Цемянке. 
                        Затем в 1900 году компания Зингер основала в городе свой завод по производству швейных машин.
                        Промышленники вкладывались в развитие городской инфраструктуры: для подготовки
                        инженерных кадров на городские предприятия было создано реальное училище.
                        В город провели электричество и водопровод, открыли библиотеку и первый кинотеатр.
                        
                    </p>
                    <h3>Характерные строения:</h3>
                    <ul>
                        <li>Общество потребителей "Зингер и Ко"</li>
                        <li>Городская дума</li>
                        <li>Реальное училище</li>
                    </ul>
                    <h3>Стили: Модерн, Псевдорусский</h3>
                    <h3>Районы: Центральный</h3>
                </div>
                <div ref={leninRef}>
                    <h1 id='lenin'>Революционный город</h1>
                    <h2>1921-1941</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>6% современной застройки</span>
                    <p>
                        В новом социалистическом государстве Подольск должен был стать образцовым соцгородом.
                        Индустриализация продолжалась, было выстроено множество новых фабрик и заводов.
                        Вокруг производств возникали рабочие поселки. Началось первое в истории города 
                        массовое жилищное строительство. Новое жилье должно было отражать новый образ жизни:
                        так появились дома-коммуны и фабрики-кухни, дворцы культуры и техникумы.
                    </p>
                    <h3>Характерные строения:</h3>
                    <ul>
                        <li>Дом культуры имени Лепсе</li>
                        <li>Подольское пехотное училище</li>
                        <li>Дом-коммуна</li>
                    </ul>
                    <h3>Стили: Конструктивизм, Сталинский Ампир</h3>
                    <h3>Районы: Центральный, Парковый, Северный, Межшоссейный</h3>
                </div>
                <div ref={stalinRef}>
                    <h1 id='stalin'>Послевоенный город</h1>
                    <h2>1941-1956</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>7% современной застройки</span>
                    <p>
                        После войны авангардные эксперименты в планировке сошли на нет.
                        Ампир окончательно утвердился как основной архитектурный стиль.
                        Приоритетом стало снабжение жильем семей рабочих подольских заводов.
                        Некоторые дома этого периода были построены немецкими пленными,
                        что нашло некоторое отражение в их виде.
                    </p>
                    <h3>Характерные строения:</h3>
                    <ul>
                        <li>Военный госпиталь</li>
                        <li>Дворец пионеров</li>
                        <li>Конструкторское бюро ПЭМЗ</li>
                    </ul>
                    <h3>Стили: Сталинский Ампир</h3>
                    <h3>Районы: Парковый, Шепчинки, Климовск</h3>
                </div>
                <div ref={hrushevRef}>
                    <h1 id='hrushev'>Город трудовой доблести</h1>
                    <h2>1956-1973</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>24% современной застройки</span>
                    <p>
                        Если предыдущие волны строительства имели целью обеспечить жильем работников подольских заводов,
                        то массовая застройка эпохи Хрущева ставила перед собой задачу форсировать урбанизацию, предоставив
                        городское жилье колхозникам из окрестных деревень. В соответствии с постановлением №1871 новостройки
                        были лишены всех излишеств и имели минимум удобств, но были очень просты в постройке. В результате
                        за 15 лет Подольск вырос более чем вдвое, население города увеличилось на 60%. 
                    </p>
                    <h3>Характерные строения:</h3>
                    <ul>
                        <li>Дом Книги</li>
                        <li>Хирургический корпус горбольницы</li>
                        <li>НИИ Животноводства</li>
                    </ul>
                    <h3>Стили: Функционализм, Брутализм</h3>
                    <h3>Районы: Высотный, Ивановский, Юбилейный, Кутузово, Южный, Климовск, Межшоссейный Центральный</h3>
                </div>
                <div ref={stagnationRef}>
                    <h1 id='stagnation'>Индустриальный город</h1>
                    <h2>1973-1993</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>16% современной застройки</span>
                    <p>
                        В эпоху застоя рост населения прекратился и темпы строительства снизились.
                        На смену плановой застройке целых районов пришли локальные инфраструктурные проекты.
                        Крупнейшим из них было Подольское Море - водохранилище, заложенное на восточной окраине города.
                        Но ему не суждено было омывать побережья Подольска - сроки затягивались до тех пор,
                        пока в 90-м году проект не заморозили. Колоссальные ворота недостроенного гидроузла
                        до сих пор стоят заброшенные посреди лемешовских полей. 
                    </p>
                    <h3>Характерные строения:</h3>
                    <ul>
                        <li>НИИ НПО "Луч"</li>
                        <li>Спорткомплекс стадиона "Труд"</li>
                        <li>Зингер-плаза</li>
                    </ul>
                    <h3>Стили: Советский модернизм</h3>
                    <h3>Районы: Парковый, Ивановский, Юбилейный, Кутузово, Климовск, Межшоссейный</h3>
                </div>
                <div ref={zeroesRef}>
                    <h1 id='zeroes'>Постиндустриальный город</h1>
                    <h2>1993-2014</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>22% современной застройки</span>
                    <p>
                        На первое десятилетие XXI века пришелся очередной всероссийский строительный бум.
                        Подольск не остался в стороне - по всему городу, часто безо всякой оглядки на планировку и стилистику 
                        вырастали жилые комплексы и торговые центры, а СНТ превращались в коттеджные поселки.
                        Заполнив всю свободную землю в черте города, новая волна жилой застройки выплеснулся на окраины, 
                        образовав новый район - Кузнечики.
                    </p>
                    <h3>Характерные строения:</h3>
                    <ul>
                        <li>ЖК "Атлант"</li>
                        <li>Ледовый дворец "Витязь"</li>
                        <li>ТРК Центральный</li>
                    </ul>
                    <h3>Стили: Постмодернизм, Капиталистический Романтизм</h3>
                    <h3>Районы: Кузнечики, Центральный, Красная Горка</h3>
                </div>
                <div ref={todayRef}>
                    <h1 id='today'>Постмодернистский город</h1>
                    <h2>2014-2024</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>22% современной застройки</span>
                    <p>
                        В 2018 году Подольск наряду с другим спутником Москвы Балашихой вошел в топ-20 самых
                        быстрорастущих городов европейского континента. В городском округе появляются гигантские 
                        индустриальные парки и тихие посёлки из таунхаусов. Впервые за долгое время были реализованы 
                        масштабные проекты по облагораживанию городской среды.
                    </p>
                    <h3>Характерные строения:</h3>
                    <ul>
                        <li>Новое здание Архива МО</li>
                        <li>Алексеевские бани</li>
                        <li>ФДРЦ "Кораблик"</li>
                    </ul>
                    <h3>Стили: Постмодернизм, Неоклассика</h3>
                    <h3>Районы: Кузнечики, Коледино</h3>
                </div>
                <div className={styles.closeButton} onClick={activateMap}>
                    <h2>close</h2>
                </div>
            </div>
        </section>
    )
}