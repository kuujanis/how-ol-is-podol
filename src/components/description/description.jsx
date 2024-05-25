import styles from './description.module.css'
import React, {useEffect, useState} from 'react'
import { useInView } from "react-intersection-observer";
import { histogram } from '../../utils';


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
    const [finishRef, inViewFinish] = useInView({threshold:0})

    const selectEpoque = (epoque, min, max) => {
        setCurrent(epoque);
        props.setEpoque([min,max])
    }
    const panTo = (center,zoom) => {
        props.mapRef.current?.flyTo({center: center, zoom: zoom, pitch: 0, bearing: 0, duration: 2000})
        props.setZoom(props.mapRef.current?.getZoom())
    }
    useEffect(() => {
        if (inViewTitle) {
            selectEpoque('title', 1781, 2024)
            panTo([37.63, 55.435],11)
        } else if (inViewMerchant) {
            selectEpoque('merchant',1781,1871)
            panTo([37.585, 55.435],12.2)
        } else if (inViewZinger) {
            selectEpoque('zinger',1872,1922)
            panTo([37.585, 55.435],12.2)
        } else if (inViewLenin) {
            selectEpoque('lenin',1923,1940)
            panTo([37.60, 55.43],11.8)
        } else if (inViewStalin) {
            selectEpoque('stalin',1941,1958)
            panTo([37.60, 55.43],11.8)
        } else if (inViewHrushev) {
            selectEpoque('hrushev',1959,1974)
            panTo([37.63, 55.435],11)
        } else if (inViewStagnation) {
            selectEpoque('stagnation',1975,1991)
        } else if (inViewZeroes) {
            selectEpoque('zeroes',1992,2007)
        } else if (inViewToday) {
            selectEpoque('today',2008,2024)
        } else if (inViewFinish) {
            selectEpoque('finish', 1781, 2024)
        }         
      }, [inViewMerchant, inViewZinger, inViewLenin, inViewStalin, inViewHrushev, inViewStagnation, inViewZeroes, inViewToday, inViewFinish]);
    

    const activateMap = () => {
        props.setDescriptionActive(false)
        props.setEpoque([1781,2024])
        props.setSettings({
            scrollZoom: true,
            boxZoom: true,
            dragRotate: false,
            dragPan: true,
            keyboard: true,
            doubleClickZoom: true,
            touchZoomRotate: true,
            touchPitch: true,
        })
        props.mapRef.current?.flyTo({center: [37.55, 55.43], zoom: 12, pitch: 0, bearing: 0, duration: 2000})
    }

    const renderHistogram = (row) => {
        return (
        <div className={styles.row} style={{width: row.share*1500, backgroundColor: row.color}}></div>
        )
    }

    return (
        <section className={styles.descolumn}>
            <div className={styles.scrolldiv}>
                <div ref={titleRef} className={styles.titlediv}>
                    <h1 id='title'>HoW OL' IS PoDoL</h1>
                    <p>
                        How ol' is Podol - это энтузиастский проект, целью которого является изучение городской среды
                        Подольска. <br/> <b onClick={activateMap}>Активировать карту.</b>
                    </p>
                </div>
                <div ref={merchantRef} className={styles.epoquediv}>
                    <h1 id='merchant'>Купеческий город</h1>
                    <h2>1781-1871</h2>
                    <span>Население: 4000</span>
                    <img className={styles.frontimg} src='https://upload.wikimedia.org/wikipedia/commons/4/44/%D0%96%D0%B8%D0%BB%D0%BE%D0%B9_%D0%B4%D0%BE%D0%BC_%D0%BA%D1%83%D0%BF%D1%86%D0%B0_%D0%9A%D0%B0%D0%BD%D0%B0%D0%BD%D1%8B%D0%BA%D0%B8%D0%BD%D0%B0_%D0%BF%D0%BE_%D0%A0%D0%B5%D0%B2%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%D1%83%2C_60_%D0%B2_%D0%9F%D0%BE%D0%B4%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%B5_2022_02.png'/>
                    <span>Менее 1% современной застройки</span>
                    <p>
                        Статус города позволил жителям Подольска активнее заниматься торговлей и ремеслами. 
                        В городе развивались ремесла, основывались мануфактуры и мелкие заводы, закладывались известняковые шахты.
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
                <div ref={zingerRef} className={styles.epoquediv}>
                    <h1 id='zinger'>Промышленный город</h1>
                    <h2>1871-1922</h2>
                    <div>Население: 18 000</div>
                    <img className={styles.frontimg} src='https://upload.wikimedia.org/wikipedia/commons/0/0a/%D0%91%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F%2C_12%D0%90_2020.jpg'/>
                    <span>3% современной застройки</span>
                    <p>
                        В 1866 году через Подольск прошла линия Московско-Курской железной дороги. По её рельсам
                        в город пришел крупный капитал. В 1871 "Пороховщиков и Ко" выстроили на богатом известняком
                        левом берегу Пахры цементный завод, давший начало новому району города - Цемянке. 
                        Затем в 1900 году компания Зингер основала в городе свой завод по производству швейных машин. 
                        Над мещанскими избами возвылись многоэтажные корпуса индустриального левиафана.
                    </p>
                    <p>
                        За работой на Зингер хлынули крестьяне из окрестных деревень, увеличив населние города в 6 раз.
                        Промышленники вкладывались в развитие городской инфраструктуры: для подготовки
                        инженерных кадров на городские предприятия открылись прогимназия и реальное училище.
                        В городе провели электричество и водопровод, открыли библиотеку и первый кинотеатр.
                        На эту эпоху также пришлась первая в истории Подольска попытка массового жилищного строительства:
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
                <div ref={leninRef} className={styles.epoquediv}>
                    <h1 id='lenin'>Революционный город</h1>
                    <h2>1923-1940</h2>
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
                <div ref={stalinRef} className={styles.epoquediv}>
                    <h1 id='stalin'>Послевоенный город</h1>
                    <h2>1941-1958</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>7% современной застройки</span>
                    <p>
                        С началом войны авангардные эксперименты в планировке сошли на нет.
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
                <div ref={hrushevRef} className={styles.epoquediv}>
                    <h1 id='hrushev'>Город трудовой доблести</h1>
                    <h2>1959-1974</h2>
                    <span>Население: 4000</span>
                    <img className={styles.frontimg} alt='' src={require('../../images/Screenshot_2.png')}/>
                    <span>27% современной застройки</span>
                    <p>
                        Если предыдущие волны строительства имели целью обеспечить жильем работников подольских заводов,
                        то массовая застройка эпохи Хрущева ставила перед собой задачу форсировать урбанизацию, предоставив
                        городское жилье колхозникам из окрестных деревень. В соответствии с постановлением №1871 новые дома
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
                <div ref={stagnationRef} className={styles.epoquediv}>
                    <h1 id='stagnation'>Индустриальный город</h1>
                    <h2>1975-1991</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>12% современной застройки</span>
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
                        <li>Подольский Городской рынок</li>
                    </ul>
                    <h3>Стили: Советский модернизм</h3>
                    <h3>Районы: Парковый, Ивановский, Зелёновский</h3>
                </div>
                <div ref={zeroesRef} className={styles.epoquediv}>
                    <h1 id='zeroes'>Постиндустриальный город</h1>
                    <h2>1992-2007</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>13% современной застройки</span>
                    <p>
                        Для начала постсоветской эпохи характерна бессистемная застройка.
                        Подольск не остался в стороне - по всему городу, часто безо всякой оглядки на планировку и стилистику 
                        вырастали жилые комплексы и торговые центры. СНТ превращались в коттеджные поселки.
                        
                    </p>
                    <h3>Характерные строения:</h3>
                    <ul>
                        <li>ЖК "Атлант"</li>
                        <li>Школа №29 имени Забродина</li>
                        <li>ТРК "Центральный"</li>
                    </ul>
                    <h3>Стили: Капиталистический Романтизм</h3>
                    <h3>Районы: Межшоссейный</h3>
                </div>
                <div ref={todayRef} className={styles.epoquediv}>
                    <h1 id='today'>Постмодернистский город</h1>
                    <h2>2008-2024</h2>
                    <img className={styles.frontimg} src=''/>
                    <span>30% современной застройки</span>
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
                    <h3>Районы: Кузнечики, Красная Горка, Южный, Коледино</h3>
                </div>
                <div className={styles.epoquediv} ref={finishRef}>
                    <h1 id='finish'>Гистограмма</h1>
                    {/* <div className={styles.histogram}>
                        {histogram.map(renderHistogram)}
                    </div> */}
                </div>
                <div className={styles.closeButton} onClick={activateMap}>
                    <h3>Активировать карту</h3>
                </div>
            </div>
        </section>
    )
}