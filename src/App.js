import { memo, useEffect, useRef, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaChevronRight } from 'react-icons/fa6'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import cursor from './assets/image/cursor.png'
import promoPhoto from './assets/image/promo-photo.png'
import cat from './assets/image/cat.png'
import sign from './assets/image/sign.png'
import cardDeco from './assets/image/card-deco.png'
import issueFootPrint from './assets/image/issue-dog-footprint.png'
import latestCardDeco from './assets/image/latest-card-deco.png'
import issue1 from './assets/image/issue1.png'
import issue2 from './assets/image/issue2.png'
import issue3 from './assets/image/issue3.png'
import donateRuleDog from './assets/image/donate-rule-dog.png'
import donateDog1 from './assets/image/donate-dog1.png'
import donateCat2 from './assets/image/donate-cat2.png'
import donateCat3 from './assets/image/donate-cat3.png'
import donateDeco from './assets/image/donate-deco.png'
import commentMan from './assets/image/comment-man.png'
import youtube from './assets/image/youtube.png'
import twitter from './assets/image/twitter.png'
import instagram from './assets/image/instagram.png'
import facebook from './assets/image/facebook.png'
import footerDeco from './assets/image/footer-deco.png'
import Navbar from './component/Navbar/Navbar'
import Loading from './component/Loading/Loading'
import { fakeActives, fakeIssue } from './fakeDb'
import { MODAL_TYPE, PAY_METHOD } from './constant'
import './App.css';

const ActiveContent = ({ modalData }) => {
  return (
    <div className='latest-card latest-card--modal'>
      <div className={`top-img ${modalData?.imageName} position-relative`}>
        <div className='card-date'>{modalData?.date}</div>
      </div>
      <div className='card-content'>
        <h5 className='card-title'>{modalData?.title}</h5>
        <h5 className='card-desc'>{modalData?.desc}</h5>
      </div>
    </div>
  )
}

const IssueContent = ({ modalData }) => {
  return (
    <div className='carousel-wrap carousel-wrap--modal'>
      <div className='issue-tab'>
        <h2>政策{modalData.id}</h2>
        <img className='d-none d-lg-block' src={issueFootPrint} alt='政策圖示'/>
      </div>
      <h2 className='issue-title'>{modalData.title}</h2>
      <ol className='issue-list'>
        {modalData.desc.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  )
}

const DonateContent = memo(({ price, setDonateShow, setPrice, setToastMessage, setToastShow }) => {
  const [step, setStep] = useState(1)
  const priceArr = price.split('').reverse()

  const handlePayment = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    // 未選擇支付方式
    if (!data.get('paymethod')) {
      setToastShow(true)
      setToastMessage({
        status: 'warning',
        message: '請選擇支付方式',
      })
      return;
    }
    setToastShow(true)
    setToastMessage({
      status: 'success',
      message: '感謝您慷慨捐獻',
    })
    setDonateShow(false)
    setPrice('')
  }

  if (price.length > 3) {
    price.split('').reverse().forEach((word, index) => {
      if ((index + 1) % 3 === 0 ) {
        priceArr.splice(index + 1, 0, ',')
      }
    });
  }

  return (
    <div className='donate-modal'>
      {step === 1 &&
        <>
          <div className='donate-modal-img'>
            <img src={donateRuleDog} alt='捐贈規定圖片'/>
          </div>
          <h2 className='step1-title'>政治獻金捐贈規定</h2>
          <div className='donate-rule-list mt-4'>
            <p>捐贈政治獻金額度規定</p>
            <p>對單一擬參選人 （單位：新台幣）</p>
            <p>個人捐贈：10 萬元 / 年</p>
            <p>對不同擬參選人：年度總和不得超過 30 萬元</p>
            <p>營利事業：100 萬元 / 年</p>
            <p>對不同擬參選人：年度總和不得超過 200 萬元</p>
            <p>人民團體：50 萬元 / 年</p>
            <p>對不同擬參選人：年度總和不得超過 100 萬元</p>
            <p>＊ 任何人不得以本人以外名義捐贈或超過新台幣 1 萬元之匿名捐款。</p>
            <p>＊ 超過新台幣 10 萬元以上現金捐贈，應以「支票或經由郵局、銀行匯款」為之。</p>
            <p>不得捐贈政治獻金規定</p>
            <p>不得捐贈政治獻金之對象</p>
            <p>外國人民、大陸地區人民、香港及澳門居民、台灣未具有選舉權之人，同一種選舉擬參選人。</p>
            <p>公營事業或政府持有資本達 20% 之民營企業。</p>
            <p>與政府機關/機構有巨額採購或重大公共建設投資契約，或與政黨經營或投資之事業有巨額採購契約，且在履約期間之廠商或個人。</p>
            <p>有累積虧損尚未依規定彌補之營利事業。</p>
            <p>政黨經營或投資之事業。</p>
            <p>財團法人、宗教團體。</p>
            <p>非本國國民擔任本國團體或法人之董事長職務。</p>
            <p>非本國國民占本國團體或法人之董事、監察人、執行業務或代表公司之股東等各項職務總名額超過 1/3 者。</p>
            <p>非本國國民占股份有限公司之股東權 30% 以上或無限公司、兩合公司、有限公司之股東及一般法人、團體之社員人數超過 1/3 以上。</p>
          </div>
          <div className='btns-wrap'>
            <button 
              className='order-1 order-lg-2 ms-0 ms-lg-3 mb-3 mb-lg-0'
              onClick={() => setStep(2)}
            >
              同意條款，前往捐款
            </button>
            <button 
              className='order-2 order-lg-1' 
              onClick={() => { 
                setDonateShow(false)
                setPrice('')
              }}
            >
              取消
            </button>
          </div>
        </>
      }
      {step === 2 &&
        <div className='step-container'>
          <h2 className='step2-title'>付款方式</h2>
          <div className='cost-container'>
            <div className='cost-list'>
              <h5>實付金額</h5>
              <h5>NT$ {priceArr.reverse().join('')}</h5>
            </div>
            <div className='radio-container'>
              <form onSubmit={handlePayment}>
                <Form.Check
                  name='paymethod'
                  className='pay-method-radio'
                  type='radio'
                  id='credit-card'
                  label='信用卡付款'
                  value={PAY_METHOD.creditCard}
                />
                <Form.Check
                  name='paymethod'
                  className='pay-method-radio'
                  type='radio'
                  id='online-transfer'
                  label='線上轉帳'
                  value={PAY_METHOD.onlineTransfer}
                />
                <Form.Check
                  name='paymethod'
                  className='pay-method-radio'
                  type='radio'
                  id='linepay'
                  label='LinePay'
                  value={PAY_METHOD.linepay}
                />
                <button 
                  className='checkout-btn'
                  type='submit'
                >
                  確認結帳
                </button>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  )
})

function App() {
  const [cursorCoor, setCursorCoor] = useState({left: 0, top: 0})
  const [price, setPrice] = useState('')
  const [isShownToTopBtn, setIsShownToTopBtn] = useState(false)
  const [show, setShow] = useState(false)
  const [donateShow, setDonateShow] = useState(false)
  const [typeOfData, setTypeOfData] = useState(null)
  const [modalData, setModalData] = useState(null)
  const [issueIndex, setIssueIndex] = useState(0)
  const [counter, setCounter] = useState('0')
  const [toastShow, setToastShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // 建議表單欄位
  const nameInput = useRef()
  const phoneInput = useRef()
  const emailInput = useRef()
  const commentInput = useRef()
  const [toastMessage, setToastMessage] = useState({
    status: 'primary',
    message: '',
  })
  const couterDiv = useRef()
  let counterTimer;
  const addEachTime = 13389050
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(couterDiv.current)
        counterTimer = setInterval(() => {
          setCounter(prev => {
            const finalNum = parseInt(couterDiv.current.dataset.counter)
            const numberRemoveComma = parseInt(prev.replaceAll(',', ''), 10)
            if (numberRemoveComma + addEachTime === finalNum || numberRemoveComma + addEachTime > finalNum) {
              clearInterval(counterTimer)
              return finalNum.toLocaleString("en-US")
            }
            return (numberRemoveComma + addEachTime).toLocaleString("en-US")
          })
        }, 50);
      }
    })
  }
  const observer = new IntersectionObserver(callback, {
    rootMargin: window.innerWidth > 1200 ? "-200px" : "0px"
  })

  const handleDonate = (e) => {
    setPrice(e.target.value)
  }

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleComment = (e) => {
    e.preventDefault()
    // 有填寫建議就可以成功提交了
    if (commentInput.current.value === '') {
      setToastShow(true)
      setToastMessage({
        status: 'warning',
        message: '請至少填個建議呦',
      })
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setToastShow(true)
      setToastMessage({
        status: 'success',
        message: '表單提交完成，謝謝您寶貴的意見',
      })
    }, 1500);
  }

  const displayToTopButton = () => {
    if (window.scrollY > 800) {
      setIsShownToTopBtn(true)
    } else {
      setIsShownToTopBtn(false)
    }
  }

  const openModal = (displayData, type) => {
    if (window.innerWidth > 992) return 
    setShow(true)
    setModalData(displayData)
    setTypeOfData(type)
  }

  const cursorImageMove = (e) => {
    setCursorCoor({ y: e.pageY, x: e.pageX})
  } 

  const donateConfirmHandler = () => {
    if (price === '') {
      setToastShow(true)
      setToastMessage({
        status: 'warning',
        message: '請選擇其一方案',
      })
      return
    }
    setDonateShow(true)
  }

  const onLoad = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    AOS.init()
    window.addEventListener('mousemove', cursorImageMove)
    window.addEventListener('scroll', displayToTopButton)
    window.addEventListener('load', onLoad)
    observer.observe(couterDiv.current)
    return () => {
      window.removeEventListener('mousemove', cursorImageMove)
      window.removeEventListener('scroll', displayToTopButton)
      window.removeEventListener('load', onLoad)
      observer.unobserve(couterDiv.current)
    }
  }, [])
  return (
    <div className="App">
      {isLoading && <Loading />}
      {window.innerWidth > 1024 &&
        <img
          style={{ top: cursorCoor.y, left: cursorCoor.x}}
          className='cursor' 
          src={cursor} 
          alt='cursor'
        />
      }
      <Toast
          bg={toastMessage.status}
          autohide={true}
          delay={2500}
          className='toast-container'
          onClose={() => setToastShow(false)}
          show={toastShow}
      >
        <Toast.Body className='toast-body'>{toastMessage.message}</Toast.Body>
      </Toast>
      <Modal 
        centered 
        show={show} 
        onHide={() => setShow(false)} 
        className='card-modal'
      > 
        {typeOfData === MODAL_TYPE.activity && 
          <ActiveContent modalData={modalData}/>
        }
        {typeOfData === MODAL_TYPE.issue && 
          <IssueContent modalData={modalData}/>
        }
      </Modal>
      <Modal 
        size="xl"
        centered 
        show={donateShow} 
        onHide={() => {
          setDonateShow(false)
          setPrice('')
        }} 
        className='donate-modal-bg'
      > 
        <DonateContent 
          price={price} 
          setPrice={setPrice} 
          setDonateShow={setDonateShow} 
          setToastShow={setToastShow}
          setToastMessage={setToastMessage} 
        />
      </Modal>
    {isShownToTopBtn &&
      <button className='to-top-btn' onClick={scrollToTop}>
        <img src={issueFootPrint} alt='回頂部'/>
        回頂部
      </button>
    }
     <Navbar />
     <div className='banner'>
      <Container className='h-100'>
        <Row className='h-100 align-items-center'>
          <Col md={6} className='order-2 order-md-1'>
            <div className='title-container'>
              <p 
                className='mb-0'
                data-aos="fade-right"
                data-aos-duration="500"
              >
                2024立委參選人
              </p>
              <h1 
                className='d-flex justify-content-end align-items-center'
                data-aos="fade-right"
                data-aos-duration="700"
              >
                <span className='number-deco'>2</span>
                喵立翰
              </h1>
              <p
                data-aos="fade-right"
                data-aos-duration="1000" 
              >
                台灣的明天 喵先鋪路
              </p>
            </div>
          </Col>
          <Col 
            md={6} 
            className='order-1 order-md-2'
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className='banner-image'>
              <img src={promoPhoto} alt='候選人宣傳照'/>
            </div>
          </Col>
        </Row>
      </Container>
     </div>

     {/* 小額捐款 */}
     <section className='brief-donate'>
      <Container className='h-100'>
          <Row className='h-100 align-items-center'>
            <Col 
              md={6} 
              className='d-flex justify-content-md-end justify-content-center order-2 order-md-1'
            >
              <div 
                className='brief-donate-title'
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <h4>小額捐款</h4>
                <p>您的小筆捐款,<br/>是每隻毛孩未來的大大動力！</p>
                <a href='#donate'>
                  <button className='donate-btn'>我要捐款</button>
                </a>
              </div>
            </Col>
            <Col md={6} className='order-1 order-md-2'>
              <div 
                className='ps-5 d-flex align-items-end justify-content-md-left justify-content-center'
                data-aos="flip-right"
                data-aos-duration="1000"
              > 
                <div className='cat-container'>
                  <img src={cat} alt='貓咪圖案'/>
                </div>
                <div className='deco-circle'></div>
              </div>
            </Col>
          </Row>
        </Container>
        <div id='advocate' className='anchor-area'></div>
     </section>

     {/* 候選人主張 */}
     <section className='advocate'>
      <h2 className='section-title'>候選人主張</h2>
      <Container>
        <Row>
          <Col 
            md={8}
            data-aos="zoom-out"
            data-aos-duration="500"
          >
            <h4 className='advocate-desc'>我堅信，藉由推動更完善的貓咪福利和相關政策，更是間接地投資於台灣的未來。畢竟，民眾的身心健康與工作熱情是推動經濟的核心動力。透過完善的貓咪福利政策，為台灣的 GDP 經濟帶來巨大效益。<br/><br/>
            因此，我期望能在立法院內推進這些政策，確保每一隻貓咪都能得到他們應有的照顧，同時也為台灣的經濟發展助一臂之力。讓我們一同護航台灣的幸福經濟，從照顧每一隻貓咪開始。
            </h4>
          </Col>
          <Col 
            md={4} 
            className='d-block d-md-flex flex-column justify-content-end align-items-center'
            data-aos="fade-left"
            data-aos-duration="800"
          >
            <div className='sign-container'>
              <img src={sign} alt='簽名圖'/>
            </div>
          </Col>
        </Row>
      </Container>
      <div id='latest' className='anchor-area'></div>
     </section>
     {/* 最新活動 */}
     <section className='latest'>
      <h2 className='section-title'>最新活動</h2>
      <div className='d-flex d-lg-none latest-cards--mobile'>
        <div 
          className='latest-card latest-card--mobile' 
          onClick={() => openModal(fakeActives[0], MODAL_TYPE.activity)}
        >
          <div className='card-date'>2023.12.26</div>
          <div className='top-img top-img1'></div>
          <div className='card-content'>
            <h5 className='card-title text-truncate'>參與台北寵物論壇，爭取貓咪友善環境</h5>
            <h5 className='card-desc'>炎夏日的周六，我走進了台北寵物論壇，帶著一副貓耳髮箍，決定要全力宣傳「貓咪至上」的理念！我相信，我們的都市中，每一隻貓咪都應該有自己的 VIP 休憩空間。</h5>
          </div>
        </div>
        <div 
          className='latest-card latest-card--mobile' 
          onClick={() => openModal(fakeActives[1], MODAL_TYPE.activity)}
        >
          <div className='card-date'>2023.12.24</div>
          <div className='top-img top-img2'></div>
          <div className='card-content'>
            <h5 className='card-title text-truncate'>掃街模式開啟！帶著你的貓耳，來和我一起走！</h5>
            <h5 className='card-desc'>街上氣氛真的很棒，從小孩到大人，甚至有些狗狗朋友都帶著貓耳來找我握手，真的太可愛了！這次的活動不僅讓我看到大家的熱情，更加堅定了我推進「貓咪友善環境」政策的決心。</h5>
          </div>
        </div>
        <div 
          className='latest-card latest-card--mobile' 
          onClick={() => openModal(fakeActives[2], MODAL_TYPE.activity)}
        >
          <div className='card-date'>2023.12.20</div>
          <div className='top-img top-img3'></div>
          <div className='card-content'>
            <h5 className='card-title text-truncate'>收容所模特兒大比拼！</h5>
            <h5 className='card-desc'>今天的收容所不再是一片寂靜。為了讓更多人認識到這裡的毛孩子，我們舉辦了一場前所未有的「模特兒走秀」！</h5>
          </div>
        </div>
      </div>
      <Container className='mt-5 d-none d-lg-block'>
        <Row className='justify-content-center position-relative'>
          <div className='activity-timeline'>
            <img 
              src={latestCardDeco} 
              alt='活動卡片左側裝飾'
              data-aos="fade-down"
              data-aos-duration="1000"
            />         
            <div className='deco-line--bottom'></div>          
          </div>
          <Col lg={10}>
            <div 
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <div className='activity-date'>2023.12.26</div>
              <div className='desktop-card'>
                <div className='activity-image activity-img1'></div>
                <div className='card-content'>
                  <h4>參與台北寵物論壇，爭取貓咪友善環境</h4>
                  <p>炎夏日的周六，我走進了台北寵物論壇，帶著一副貓耳髮箍，決定要全力宣傳「貓咪至上」的理念！我相信，我們的都市中，每一隻貓咪都應該有自己的 VIP 休憩空間。</p>
                </div>
                <div className='card-deco'>
                  <img src={cardDeco} alt='卡片裝飾'/> 
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-center position-relative'>
          <div className='activity-timeline'>
            <img 
              src={latestCardDeco} 
              alt='活動卡片左側裝飾'
              data-aos="fade-down"
              data-aos-delay="100"
              data-aos-duration="1000"
            /> 
            <div className='deco-line--top'></div>          
            <div className='deco-line--bottom'></div>          
          </div>
          <Col lg={10}>
            <div 
              className='mt-4'
              data-aos="fade-down"
              data-aos-delay="100"
              data-aos-duration="1000"
            >
              <div className='activity-date'>2023.12.24</div>
              <div className='desktop-card'>
                <div className='activity-image activity-img2'></div>
                <div className='card-content'>
                  <h4>掃街模式開啟！帶著你的貓耳，來和我一起走！</h4>
                  <p>街上氣氛真的很棒，從小孩到大人，甚至有些狗狗朋友都帶著貓耳來找我握手，真的太可愛了！這次的活動不僅讓我看到大家的熱情，更加堅定了我推進「貓咪友善環境」政策的決心。</p>
                </div>
                <div className='card-deco'>
                  <img src={cardDeco} alt='卡片裝飾'/> 
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-center position-relative'>
          <div className='activity-timeline'>
            <img 
              src={latestCardDeco} 
              alt='活動卡片左側裝飾'
              data-aos="fade-down"
              data-aos-delay="300"
              data-aos-duration="1000"
            />  
            <div className='deco-line--top'></div>              
          </div>
          <Col lg={10}>
            <div 
              className='mt-4'
              data-aos="fade-down"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <div className='activity-date'>2023.12.20</div>
              <div className='desktop-card'>
                <div className='activity-image activity-img3'></div>
                <div className='card-content'>
                  <h4>收容所模特兒大比拼！</h4>
                  <p>今天的收容所不再是一片寂靜。為了讓更多人認識到這裡的毛孩子，我們舉辦了一場前所未有的「模特兒走秀」！</p>
                </div>
                <div className='card-deco'>
                  <img src={cardDeco} alt='卡片裝飾'/> 
                </div>
              </div>
            </div>  
          </Col>
        </Row>
      </Container>
      <div id='issues' className='anchor-area'></div>
     </section>
     {/* 政策議題 */}
     <section className='issues'>
      <h2 className='section-title'>政策議題</h2>
      <Container className='mt-5'>
        <Row className='justify-content-center'>
          <Col md={10}>
            <div className='carousel-wrap' onClick={() => openModal(fakeIssue[issueIndex], MODAL_TYPE.issue)}>
             <Swiper 
              onSlideChange={(swiper) => {setIssueIndex(swiper.activeIndex)}}
              effect={'fade'}
              fadeEffect={{
                crossFade: true,
              }}
              navigation={true} 
              pagination={{
                clickable: true,
              }}
              modules={[EffectFade, Navigation, Pagination]} 
              className='mySwiper'
            >
              <SwiperSlide>
                <div>
                  <div className='issue-tab'>
                    <h2>政策1</h2>
                    <img className='d-none d-lg-block' src={issueFootPrint} alt='政策圖示'/>
                  </div>
                  <Col md={10} className='mx-auto'>
                    <div>
                      <h2 className='issue-title'>為毛孩子謀福利！推動寵物醫療保障方案</h2>
                      <Row>
                        <Col lg={8} className='d-none d-lg-block'>
                          <ol className='issue-list'>
                            <li>設立寵物醫療基金：每年撥款新台幣 10 億元，專款專用於支援家庭寵物的醫療費用</li>
                            <li>提供醫療補助：每隻寵物每年可獲得高達新台幣 20,000 元的醫療補助，減輕飼主的經濟壓力</li>
                            <li>合作動物醫院：目前已有和超過 200 家動物醫院進行初步的合作討論</li>
                          </ol>
                        </Col>
                        <Col lg={4}>
                          <div className='issue-img'>
                            <img src={issue1} alt='政策宣傳圖片'/>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className='issue-tab'>
                    <h2>政策2</h2>
                    <img className='d-none d-lg-block' src={issueFootPrint} alt='政策圖示'/>
                  </div>
                  <Col md={10} className='mx-auto'>
                    <div>
                      <h2 className='issue-title'>打造休閒天堂！推廣寵物休閒與娛樂場所</h2>
                      <Row>
                        <Col lg={8} className='d-none d-lg-block'>
                          <ol className='issue-list'>
                            <li>建立寵物公園：每年撥款新台幣 5 億元，用於在各大都市建立專屬的寵物公園。根據初步規劃，預計在第一年內，將在全國範圍內建立至少 10 座寵物公園</li>
                            <li>推廣寵物友善商家：鼓勵商家提供寵物友善的環境，並為參與的商家提供稅收優惠。預計在政策實施後的首年，將有超過 500 家商家加入此計畫</li>
                            <li>舉辦寵物活動和工作坊：與各大寵物社團和組織合作，每年舉辦至少 5 場大型的寵物活動，包括寵物才藝比賽、飼養知識工作坊等</li>
                          </ol>
                        </Col>
                        <Col lg={4}>
                          <div className='issue-img'>
                            <img src={issue2} alt='政策宣傳圖片'/>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className='issue-tab'>
                    <h2>政策3</h2>
                    <img className='d-none d-lg-block' src={issueFootPrint} alt='政策圖示'/>
                  </div>
                  <Col md={10} className='mx-auto'>
                    <div>
                      <h2 className='issue-title'>推廣寵物飼養教育，讓愛更加專業</h2>
                      <Row>
                        <Col lg={8} className='d-none d-lg-block'>
                          <ol className='issue-list'>
                            <li>建立寵物飼養教育中心：每年撥款新台幣 3 億元，用於在全國各地建立專業的寵物飼養教育中心。預計在第一年內，在全國至少 5 大城市設立教育中心。</li>
                            <li>推廣寵物飼養課程：與學校、社區組織和寵物社團合作，推出一系列免費的寵物飼養課程。預計每年將有超過 10,000 名市民受益。</li>
                            <li>製作教育資料：出版寵物飼養手冊、影片和線上課程，讓所有有意飼養寵物的家庭都能輕鬆取得正確的知識</li>
                          </ol>
                        </Col>
                        <Col lg={4}>
                          <div className='issue-img'>
                            <img src={issue3} alt='政策宣傳圖片'/>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </div>
              </SwiperSlide>
             </Swiper>
            </div>
          </Col>
        </Row>
      </Container>
      <div id='donate' className='anchor-area'></div>
     </section>
     {/* 小額捐款 */}
     <section className='donate'>
      <h2 className='section-title'>小額捐款</h2>
      <Container>
        <Row>
          <Col lg={6} className='order-2 order-lg-1 pt-3 pt-lg-5'>
            <label 
              className='donate-label' 
              htmlFor='dog1'
              data-aos="fade-right"
              data-aos-duration="1000"
            >  
              <div className={`donate-card ${price === '600' ? 'active' : ''}`}>
                <div className='flex-grow-1'>  
                  <h2 className='donate-title'>喵星人之友</h2>
                  <p className='sponsor-count'>已有<span>9957</span>人贊助</p>
                  <div className='price'>NT$ <span>600</span></div>
                </div>
                <div className='donate-card-img'>
                  <img src={donateDog1} alt='捐款動物圖'/>
                </div>
              </div>
              <input 
                type='radio' 
                id='dog1' 
                name='donate-amount'
                value='600'
                onChange={handleDonate}
              />
            </label>
            <label 
              className='donate-label' 
              htmlFor='cat2'
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-duration="1000"
            >  
              <div className={`donate-card ${price === '6000' ? 'active' : ''}`}>
                <div className='flex-grow-1'>  
                  <h2 className='donate-title'>喵星大使</h2>
                  <p className='sponsor-count'>已有<span>2000</span>人贊助</p>
                  <div className='price'>NT$ <span>6,000</span></div>
                </div>
                <div className='donate-card-img'>
                  <img src={donateCat2} alt='捐款動物圖'/>
                </div>
              </div>
              <input type='radio' id='cat2' name='donate-amount' value='6000' onChange={handleDonate}/>
            </label>
            <label 
              className='donate-label' 
              htmlFor='cat3'
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-duration="1000"
            >  
              <div className={`donate-card ${price === '60000' ? 'active' : ''}`}>
                <div className='flex-grow-1'>  
                  <h2 className='donate-title'>喵星傳奇</h2>
                  <p className='sponsor-count'>已有<span>9957</span>人贊助</p>
                  <div className='price'>NT$ <span>60,000</span></div>
                </div>
                <div className='donate-card-img'>
                  <img src={donateCat3} alt='捐款動物圖'/>
                </div>
              </div>
              <input type='radio' id='cat3' name='donate-amount' value='60000' onChange={handleDonate}/>
            </label>
            <div className='d-block d-lg-none go-donate-card'>
              <h2>自訂贊助金額</h2>
              <input type='text' value={price} readOnly />
              <button 
                  className='donate-cta' 
                  onClick={donateConfirmHandler}
                >
                  前往捐款
                </button>
            </div>
          </Col>
          <Col lg={6} className='order-1 order-lg-2'>
            <div className='donate-right-col'>
              <h2 className='donate-slogan'>您的小筆捐款，<br/>是每隻毛孩未來的大大動力！</h2>
              <p className='donate-progress-text'>目前小額贊助總金額</p>
              <h2 
                className='total-amount' 
                ref={couterDiv}
                data-counter="987655873"
              >
                {counter}
              </h2>
              <div className='d-none d-lg-block go-donate-card'>
                <h2>自訂贊助金額</h2>
                <input type='text' value={price} readOnly />
                <button 
                  className='donate-cta' 
                  onClick={donateConfirmHandler}
                >
                  前往捐款
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className='donate-deco'>
        <img src={donateDeco} alt='donate-deco'/>
      </div>
     </section>
     {/* 表單區塊 */}
     <section className="comment">
       <div id='comment' className='anchor-final'></div>
       <Container className='comment-container'>
        <h2 
          className='comment-title'
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          您的聲音，我們的行動！
        </h2>
        <Row className='justify-content-end'>
          <Col lg={10} className='position-relative'>
            <h5 
              className='comment-subtitle'
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-duration="1000"
            >
              親愛的鄉親，每一位市民的意見都是我們社區前進的原動力。
            </h5>
            <h5 
              className='comment-subtitle'
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              無論大小事，我都誠摯希望聽到您的建議。分享您的想法，一同為我們的未來打造更美好！
            </h5>
            <div 
              className='comment-man-img d-block d-lg-none'
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <img src={commentMan} alt='comment-man'/>
            </div>
            <div 
              className='form-container'
              data-aos="fade-left"
              data-aos-delay="800"
              data-aos-duration="1000"
            >
              <form onSubmit={handleComment}>
                <label htmlFor='name' className='field'>
                  <div>姓名</div>
                  <input 
                    id='name' 
                    type='text' 
                    placeholder='您的姓名'
                    ref={nameInput}
                  />
                </label>
                <label htmlFor='email' className='field'>
                  <div>電子信箱</div>
                  <input 
                    id='email' 
                    type='email' 
                    placeholder='您的電子信箱'
                    ref={emailInput}
                  />
                </label>
                <label htmlFor='phone' className='field'>
                  <div>手機</div>
                  <input 
                    id='phone' 
                    type='text' 
                    placeholder='您的手機'
                    ref={phoneInput}
                  />
                </label>
                <label htmlFor='comment' className='field'>
                  <div><span className='required-mark'>*</span>建言</div>
                  <textarea 
                    id='comment' 
                    rows='7' 
                    placeholder='您的建言'
                    ref={commentInput}
                  />
                </label>
                <div className='submit-btn-wrap mx-auto'>
                  <button className='submit-btn' type='submit'>
                    <div className='chevron-icon'><FaChevronRight /></div>
                    <div>送出意見</div>
                  </button>
                </div>
              </form>
            </div>
            <div 
              className='form-deco1'
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="1000"
            ></div>
            <div 
              className='form-deco2'
              data-aos="fade-left"
              
              data-aos-duration="1000"
            ></div>
          </Col>
        </Row>
       </Container>
       <div 
          className='comment-man-img d-none d-lg-block'
          data-aos="fade-up"
          data-aos-duration="1000"
        >
        <img src={commentMan} alt='comment-man'/>
       </div>
       <div className='comment-deco'>
        <img src={footerDeco} alt='comment-deco'/>
       </div>
     </section>
     {/* footer */}
     <footer>
      <div className='d-block d-lg-flex justify-content-between'> 
        <div className='d-block d-lg-flex footer-info-container'>
          <div className='contact-wrap'>
            <h5>聯絡資訊 |</h5>
            <p className='contact-info'>辦公室：喵星區，毛茸茸大道88號，喵喵大樓3樓</p>
            <p className='contact-info'>電話：(02) 888-5678</p>
            <p className='contact-info'>電子郵件地址：<a href='mailto:meowoffice@linmeow.tw'>meowoffice@linmeow.tw</a></p>
          </div>
          <div className='site-links mt-4 mt-lg-0'>
            <h5>快速連結 |</h5>
            <a href='#'>首頁</a>
            <a href='#'>候選人主張</a>
            <a href='#'>最新活動</a>
            <a href='#'>政策議題</a>
            <a href='#'>小額捐款</a>
          </div>
        </div>
        <div className='copyright-container'>
          <div className='d-flex justify-content-between pe-3'>
            <h3 className='mb-0'>喵黨立委參選人</h3>
          </div>
          <hr />
          <div className='social-links-wrap'>
              <img src={youtube} alt='youtube-icon'/>
              <img src={twitter} alt='twitter-icon'/>
              <img src={facebook} alt='facebook-icon'/>
              <img src={instagram} alt='instagram-icon'/>
          </div>
        </div>
      </div>
      <div className='footer-deco'>
        <img src={footerDeco} alt='footer-icon'/>
      </div>
      <div className='copyright'>版權聲明：© 2023 喵立翰 版權所有</div>
     </footer>
    </div>
  );
}

export default App;
