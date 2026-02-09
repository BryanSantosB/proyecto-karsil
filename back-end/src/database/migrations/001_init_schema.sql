--
-- PostgreSQL database dump
--

\restrict 5KzWOkzXq4NZjn2gr2cLZfE5tAPwxZqmLXgBXRYbiNHOUImotUkwhdCZeQbEZfQ

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ciudades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ciudades (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    direccion text,
    latitud numeric(9,6),
    longitud numeric(9,6),
    departamento_id integer
);


ALTER TABLE public.ciudades OWNER TO postgres;

--
-- Name: ciudades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ciudades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ciudades_id_seq OWNER TO postgres;

--
-- Name: ciudades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ciudades_id_seq OWNED BY public.ciudades.id;


--
-- Name: cotizaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cotizaciones (
    id integer NOT NULL,
    fecha timestamp without time zone DEFAULT now(),
    origen_ciudad_id integer,
    destino_ciudad_id integer,
    tipo_origen character varying(20),
    tipo_destino character varying(20),
    direccion_origen text,
    direccion_destino text,
    fecha_recojo date,
    peso numeric(10,2),
    largo numeric(10,2),
    ancho numeric(10,2),
    alto numeric(10,2),
    tipo_envio_id integer,
    modalidad_id integer,
    telefono character varying(20),
    email character varying(150),
    total numeric(10,2)
);


ALTER TABLE public.cotizaciones OWNER TO postgres;

--
-- Name: cotizaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cotizaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cotizaciones_id_seq OWNER TO postgres;

--
-- Name: cotizaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cotizaciones_id_seq OWNED BY public.cotizaciones.id;


--
-- Name: departamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departamentos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.departamentos OWNER TO postgres;

--
-- Name: departamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departamentos_id_seq OWNER TO postgres;

--
-- Name: departamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departamentos_id_seq OWNED BY public.departamentos.id;


--
-- Name: estados_reclamo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados_reclamo (
    id integer NOT NULL,
    codigo character varying(30) NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.estados_reclamo OWNER TO postgres;

--
-- Name: estados_reclamo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estados_reclamo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estados_reclamo_id_seq OWNER TO postgres;

--
-- Name: estados_reclamo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estados_reclamo_id_seq OWNED BY public.estados_reclamo.id;


--
-- Name: evidencias_reclamo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evidencias_reclamo (
    id integer NOT NULL,
    reclamo_id integer NOT NULL,
    nombre_original character varying(255),
    ruta_archivo text NOT NULL,
    tipo_mime character varying(100),
    "tamaño_bytes" integer,
    fecha_subida timestamp without time zone DEFAULT now()
);


ALTER TABLE public.evidencias_reclamo OWNER TO postgres;

--
-- Name: evidencias_reclamo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evidencias_reclamo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evidencias_reclamo_id_seq OWNER TO postgres;

--
-- Name: evidencias_reclamo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evidencias_reclamo_id_seq OWNED BY public.evidencias_reclamo.id;


--
-- Name: fechas_recojo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fechas_recojo (
    id integer NOT NULL,
    fecha date NOT NULL,
    activo boolean DEFAULT true
);


ALTER TABLE public.fechas_recojo OWNER TO postgres;

--
-- Name: fechas_recojo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fechas_recojo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fechas_recojo_id_seq OWNER TO postgres;

--
-- Name: fechas_recojo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fechas_recojo_id_seq OWNED BY public.fechas_recojo.id;


--
-- Name: historial_reclamo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial_reclamo (
    id integer NOT NULL,
    reclamo_id integer,
    estado_id integer,
    comentario text,
    creado_por integer,
    fecha timestamp without time zone DEFAULT now()
);


ALTER TABLE public.historial_reclamo OWNER TO postgres;

--
-- Name: historial_reclamo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_reclamo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_reclamo_id_seq OWNER TO postgres;

--
-- Name: historial_reclamo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_reclamo_id_seq OWNED BY public.historial_reclamo.id;


--
-- Name: modalidad_envio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modalidad_envio (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    value character varying(30) NOT NULL,
    icon text
);


ALTER TABLE public.modalidad_envio OWNER TO postgres;

--
-- Name: modalidad_envio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modalidad_envio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modalidad_envio_id_seq OWNER TO postgres;

--
-- Name: modalidad_envio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modalidad_envio_id_seq OWNED BY public.modalidad_envio.id;


--
-- Name: motivos_reclamo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.motivos_reclamo (
    id integer NOT NULL,
    codigo character varying(30) NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.motivos_reclamo OWNER TO postgres;

--
-- Name: motivos_reclamo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.motivos_reclamo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.motivos_reclamo_id_seq OWNER TO postgres;

--
-- Name: motivos_reclamo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.motivos_reclamo_id_seq OWNED BY public.motivos_reclamo.id;


--
-- Name: permisos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permisos (
    id integer NOT NULL,
    codigo character varying(100) NOT NULL,
    descripcion text
);


ALTER TABLE public.permisos OWNER TO postgres;

--
-- Name: permisos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permisos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permisos_id_seq OWNER TO postgres;

--
-- Name: permisos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permisos_id_seq OWNED BY public.permisos.id;


--
-- Name: prioridades_reclamo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prioridades_reclamo (
    id integer NOT NULL,
    codigo character varying(20) NOT NULL,
    nombre character varying(50) NOT NULL,
    nivel integer NOT NULL
);


ALTER TABLE public.prioridades_reclamo OWNER TO postgres;

--
-- Name: prioridades_reclamo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prioridades_reclamo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.prioridades_reclamo_id_seq OWNER TO postgres;

--
-- Name: prioridades_reclamo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prioridades_reclamo_id_seq OWNED BY public.prioridades_reclamo.id;


--
-- Name: reclamos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reclamos (
    id integer NOT NULL,
    numero_reclamo character varying(30) NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now(),
    nombre_completo character varying(150) NOT NULL,
    tipo_documento character varying(10) NOT NULL,
    numero_documento character varying(20) NOT NULL,
    email character varying(150) NOT NULL,
    telefono character varying(20),
    numero_guia character varying(50),
    fecha_servicio date,
    tipo_servicio_id integer,
    oficina_id integer,
    descripcion text,
    monto_reclamado numeric(10,2),
    acepta_politicas boolean NOT NULL,
    firma_digital text NOT NULL,
    usuario_asignado_id integer,
    estado character varying(30) DEFAULT 'pendiente'::character varying,
    estado_id integer DEFAULT 1,
    prioridad_id integer DEFAULT 1,
    asignado_a integer,
    creado_por integer,
    motivo_reclamo integer
);


ALTER TABLE public.reclamos OWNER TO postgres;

--
-- Name: reclamos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reclamos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reclamos_id_seq OWNER TO postgres;

--
-- Name: reclamos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reclamos_id_seq OWNED BY public.reclamos.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: roles_permisos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles_permisos (
    rol_id integer NOT NULL,
    permiso_id integer NOT NULL
);


ALTER TABLE public.roles_permisos OWNER TO postgres;

--
-- Name: tarifarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tarifarios (
    id integer NOT NULL,
    ciudad_id integer,
    modalidad_id integer,
    tipo_envio_id integer,
    primer_kg numeric(10,2),
    kg_adicional numeric(10,2),
    base_hasta_20kg numeric(10,2),
    activo boolean DEFAULT true
);


ALTER TABLE public.tarifarios OWNER TO postgres;

--
-- Name: tarifarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tarifarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tarifarios_id_seq OWNER TO postgres;

--
-- Name: tarifarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tarifarios_id_seq OWNED BY public.tarifarios.id;


--
-- Name: tipos_envio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos_envio (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    value character varying(30) NOT NULL,
    icon text
);


ALTER TABLE public.tipos_envio OWNER TO postgres;

--
-- Name: tipos_envio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_envio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_envio_id_seq OWNER TO postgres;

--
-- Name: tipos_envio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_envio_id_seq OWNED BY public.tipos_envio.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password_hash text NOT NULL,
    activo boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: usuarios_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios_roles (
    usuario_id integer NOT NULL,
    rol_id integer NOT NULL
);


ALTER TABLE public.usuarios_roles OWNER TO postgres;

--
-- Name: ciudades id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudades ALTER COLUMN id SET DEFAULT nextval('public.ciudades_id_seq'::regclass);


--
-- Name: cotizaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cotizaciones ALTER COLUMN id SET DEFAULT nextval('public.cotizaciones_id_seq'::regclass);


--
-- Name: departamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamentos ALTER COLUMN id SET DEFAULT nextval('public.departamentos_id_seq'::regclass);


--
-- Name: estados_reclamo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_reclamo ALTER COLUMN id SET DEFAULT nextval('public.estados_reclamo_id_seq'::regclass);


--
-- Name: evidencias_reclamo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidencias_reclamo ALTER COLUMN id SET DEFAULT nextval('public.evidencias_reclamo_id_seq'::regclass);


--
-- Name: fechas_recojo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fechas_recojo ALTER COLUMN id SET DEFAULT nextval('public.fechas_recojo_id_seq'::regclass);


--
-- Name: historial_reclamo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_reclamo ALTER COLUMN id SET DEFAULT nextval('public.historial_reclamo_id_seq'::regclass);


--
-- Name: modalidad_envio id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modalidad_envio ALTER COLUMN id SET DEFAULT nextval('public.modalidad_envio_id_seq'::regclass);


--
-- Name: motivos_reclamo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motivos_reclamo ALTER COLUMN id SET DEFAULT nextval('public.motivos_reclamo_id_seq'::regclass);


--
-- Name: permisos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos ALTER COLUMN id SET DEFAULT nextval('public.permisos_id_seq'::regclass);


--
-- Name: prioridades_reclamo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prioridades_reclamo ALTER COLUMN id SET DEFAULT nextval('public.prioridades_reclamo_id_seq'::regclass);


--
-- Name: reclamos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamos ALTER COLUMN id SET DEFAULT nextval('public.reclamos_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: tarifarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarifarios ALTER COLUMN id SET DEFAULT nextval('public.tarifarios_id_seq'::regclass);


--
-- Name: tipos_envio id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_envio ALTER COLUMN id SET DEFAULT nextval('public.tipos_envio_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: ciudades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ciudades (id, nombre, direccion, latitud, longitud, departamento_id) FROM stdin;
1	LIMA - CALLAO	Calle Cromo Mz. B Lt. 14-A Urb, Callao 07041	-12.027816	-77.101920	1
2	LIMA - BAZATE Y MEZA - LA VICTORIA	Bauzate y Meza 225 – La Victoria	-12.064729	-77.031697	2
3	LIMA - LUNA PIZARRO - LA VICTORIA	Luna Pizarro 593 – La Victoria	-12.065340	-77.027519	3
4	LIMA - GALERIA SAN ANDRES - LA VICTORIA	Av. Jose Galvez N° 199 Int.94 – La Victoria	-12.060714	-77.032496	4
5	LIMA - SAN JUAN DE LURIGANCHO	Calle 13 de enero N° 2056 - San Juan de Lurigancho	-11.997330	-77.004998	5
6	LIMA - MAGDALENA	Jirón Tacna 630 Primer piso - Magdalena	\N	\N	6
7	IQUITOS	Calle Napo 670 - Iquitos	-3.745927	-73.247252	7
8	TARAPOTO	Jiron Gregorio Delgado 344 - Tarapoto	-6.490923	-76.369455	8
9	PUERTO MALDONADO	Av. Dos de Mayo - Puerto Maldonado	-12.583826	-69.192013	9
10	AREQUIPA	Av. San Martin 409 - Arequipa	-16.395041	-71.523796	10
11	CHICLAYO	Av. Victor Raul Haya de la Torre 2162 - Chiclayo	-6.797080	-79.830988	11
12	TUMBES	Cal. Jesus de Nazared - Tumbes	\N	\N	12
13	PIURA	Av. Catacaos S/N - Piura	\N	\N	13
14	CUSCO	San Sebastián - Cuzco	-13.524307	-71.970798	14
15	JULIACA	Jr. Atahualpa 176 - Juliaca	\N	\N	15
\.


--
-- Data for Name: cotizaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cotizaciones (id, fecha, origen_ciudad_id, destino_ciudad_id, tipo_origen, tipo_destino, direccion_origen, direccion_destino, fecha_recojo, peso, largo, ancho, alto, tipo_envio_id, modalidad_id, telefono, email, total) FROM stdin;
\.


--
-- Data for Name: departamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departamentos (id, nombre) FROM stdin;
1	LIMA - CALLAO
2	LIMA - BAZATE Y MEZA - LA VICTORIA
3	LIMA - LUNA PIZARRO - LA VICTORIA
4	LIMA - GALERIA SAN ANDRES - LA VICTORIA
5	LIMA - SAN JUAN DE LURIGANCHO
6	LIMA - MAGDALENA
7	LORETO
8	SAN MARTÍN
9	MADRE DE DIOS
10	AREQUIPA
11	LAMBAYEQUE
12	TUMBES
13	PIURA
14	CUSCO
15	PUNO
\.


--
-- Data for Name: estados_reclamo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estados_reclamo (id, codigo, nombre) FROM stdin;
1	open	Abierto
2	processing	En atención
3	resolved	Resuelto
4	rejected	Rechazado
\.


--
-- Data for Name: evidencias_reclamo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evidencias_reclamo (id, reclamo_id, nombre_original, ruta_archivo, tipo_mime, "tamaño_bytes", fecha_subida) FROM stdin;
1	1	small_v2.png	uploads\\reclamos\\1770057551712-small_v2.png	image/png	1240807	2026-02-02 13:39:11.80154
2	2	small_v2.png	uploads\\reclamos\\1770064821037-small_v2.png	image/png	1240807	2026-02-02 15:40:21.059235
3	3	ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	uploads\\reclamos\\1770064908230-ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	image/png	2487674	2026-02-02 15:41:48.363468
4	3	movil_v2.png	uploads\\reclamos\\1770064908253-movil_v2.png	image/png	1712758	2026-02-02 15:41:48.363468
5	4	compontentesbrazo.png	uploads\\reclamos\\1770069851929-compontentesbrazo.png	image/png	481211	2026-02-02 17:04:14.465466
6	5	compontentesbrazo.png	uploads\\reclamos\\1770072305844-compontentesbrazo.png	image/png	481211	2026-02-02 17:45:08.313338
7	6	icon_manzana.png	uploads\\reclamos\\1770128950294-icon_manzana.png	image/png	384941	2026-02-03 09:29:10.36884
8	7	icon_refrigerado.png	uploads\\reclamos\\1770150093051-icon_refrigerado.png	image/png	202162	2026-02-03 15:21:33.248293
9	7	logo_big_v2.png	uploads\\reclamos\\1770150093059-logo_big_v2.png	image/png	2135870	2026-02-03 15:21:33.248293
10	8	icon_manzana.png	uploads\\reclamos\\1770153923826-icon_manzana.png	image/png	384941	2026-02-03 16:25:23.963975
11	8	ChatGPT Image 2 feb 2026, 04_43_51 p.m..png	uploads\\reclamos\\1770153923837-ChatGPT Image 2 feb 2026, 04_43_51 p.m..png	image/png	2356075	2026-02-03 16:25:23.963975
12	9	17701553465806874180063108146593.jpg	uploads\\reclamos\\1770155385728-17701553465806874180063108146593.jpg	image/jpeg	4107665	2026-02-03 16:49:56.818466
13	10	logo_big_v2.png	uploads\\reclamos\\1770157466149-logo_big_v2.png	image/png	359945	2026-02-03 17:24:26.953177
14	11	icon_karsil.png	uploads\\reclamos\\1770212353398-icon_karsil.png	image/png	21397	2026-02-04 08:39:13.474543
15	12	icon_karsil.png	uploads\\reclamos\\1770212606788-icon_karsil.png	image/png	21397	2026-02-04 08:43:26.966424
16	13	icon_karsil.png	uploads\\reclamos\\1770212739974-icon_karsil.png	image/png	21397	2026-02-04 08:45:40.073517
17	14	icon_karsil.png	uploads\\reclamos\\1770212825418-icon_karsil.png	image/png	21397	2026-02-04 08:47:05.497671
18	15	ChatGPT Image 2 feb 2026, 04_43_51 p.m..png	uploads\\reclamos\\1770213346363-ChatGPT Image 2 feb 2026, 04_43_51 p.m..png	image/png	2356075	2026-02-04 08:55:46.462529
19	16	icon_karsil.png	uploads\\reclamos\\1770217052099-icon_karsil.png	image/png	21397	2026-02-04 09:57:32.271742
20	17	ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	uploads\\reclamos\\1770300308254-ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	image/png	2487674	2026-02-05 09:05:08.366186
21	18	ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	uploads\\reclamos\\1770300628244-ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	image/png	2487674	2026-02-05 09:10:28.38262
22	19	ChatGPT Image 6 feb 2026, 08_33_23 a.m..png	uploads\\reclamos\\1770483152801-ChatGPT Image 6 feb 2026, 08_33_23 a.m..png	image/png	2356725	2026-02-07 11:52:32.890677
23	20	ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	uploads\\reclamos\\1770643659966-ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	image/png	2487674	2026-02-09 08:27:40.051962
24	21	background-login.png	uploads\\reclamos\\1770644236966-background-login.png	image/png	2331622	2026-02-09 08:37:17.066162
25	22	ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	uploads\\reclamos\\1770644412030-ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	image/png	2487674	2026-02-09 08:40:12.142597
26	23	ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	uploads\\reclamos\\1770644466975-ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	image/png	2487674	2026-02-09 08:41:07.202052
27	24	ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	uploads\\reclamos\\1770644683972-ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	image/png	2487674	2026-02-09 08:44:44.111357
28	25	ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	uploads\\reclamos\\1770644775005-ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	image/png	2487674	2026-02-09 08:46:15.142516
29	26	ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	uploads\\reclamos\\1770644859375-ChatGPT Image 30 ene 2026, 05_39_53 p.m..png	image/png	2487674	2026-02-09 08:47:39.467483
30	27	background-login.png	uploads\\reclamos\\1770647553541-background-login.png	image/png	2331622	2026-02-09 09:32:33.761559
31	28	background-login.png	uploads\\reclamos\\1770649589827-background-login.png	image/png	2331622	2026-02-09 10:06:29.931138
\.


--
-- Data for Name: fechas_recojo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fechas_recojo (id, fecha, activo) FROM stdin;
1	2026-02-01	t
2	2026-02-02	t
3	2026-02-03	t
4	2026-02-04	t
5	2026-02-05	t
6	2026-02-06	t
7	2026-02-07	t
8	2026-02-08	f
9	2026-02-15	f
10	2026-02-28	f
11	2026-04-02	f
12	2026-04-03	f
13	2026-07-28	f
14	2026-07-29	f
\.


--
-- Data for Name: historial_reclamo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historial_reclamo (id, reclamo_id, estado_id, comentario, creado_por, fecha) FROM stdin;
\.


--
-- Data for Name: modalidad_envio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modalidad_envio (id, nombre, value, icon) FROM stdin;
1	Aéreo	aereo	/public/icons/icon_avion.png
2	Terrestre	terrestre	/public/icons/icon_camion.png
\.


--
-- Data for Name: motivos_reclamo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.motivos_reclamo (id, codigo, nombre) FROM stdin;
1	demora_entrega	Demora en la entrega
2	producto_danado	Producto dañado
3	producto_perdido	Producto perdido o extraviado
4	maltrato_personal	Maltrato o mala atención del personal
5	error_facturacion	Error en facturación o cobro
6	servicio_incompleto	Servicio incompleto
7	falta_informacion	Falta de información
8	otro	Otro motivo
\.


--
-- Data for Name: permisos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permisos (id, codigo, descripcion) FROM stdin;
1	USER_CREATE	Crear usuarios
2	USER_READ	Ver usuarios
3	USER_UPDATE	Actualizar usuarios
4	USER_DELETE	Eliminar usuarios
\.


--
-- Data for Name: prioridades_reclamo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prioridades_reclamo (id, codigo, nombre, nivel) FROM stdin;
1	baja	Baja	1
2	media	Media	2
3	alta	Alta	3
4	urgente	Crítica / Urgente	4
\.


--
-- Data for Name: reclamos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reclamos (id, numero_reclamo, fecha_creacion, nombre_completo, tipo_documento, numero_documento, email, telefono, numero_guia, fecha_servicio, tipo_servicio_id, oficina_id, descripcion, monto_reclamado, acepta_politicas, firma_digital, usuario_asignado_id, estado, estado_id, prioridad_id, asignado_a, creado_por, motivo_reclamo) FROM stdin;
7	REC-2026-000007	2026-02-03 15:21:33.248293	Alexander Buhezo	DNI	12345678	bryan@dominio.com	963258741	ASDEWQT56	2025-12-23	4	14	Este es un texto de prueba	120.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	1
2	REC-2026-000002	2026-02-02 15:40:21.059235	Bryan Santos	DNI	87654321	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE3234	2026-02-01	2	2	este es un mensjeeee	\N	t	Bryaan	\N	pendiente	\N	\N	\N	\N	1
1	REC-2026-000001	2026-02-02 13:39:11.80154	Bryan Santos	DNI	87654321	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE3234	2026-02-01	2	2	este es un mensjeeee	\N	t	Bryaan	\N	pendiente	\N	\N	\N	\N	1
21	REC-2026-000021	2026-02-09 08:37:17.066162	Bryan Santos	DNI	87654321	bryan@karsil.com	987654321	QWERQWE3234	2026-02-06	3	1	lnjñogqñohqoeirg qerg qerg	787.00	t	Bryan	\N	pendiente	1	1	\N	1	2
14	REC-2026-000014	2026-02-04 08:47:05.497671	Bryan Alexander	DNI	52146378	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE3234	2026-01-11	4	6	Este es un texto de prueba	745.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	2
13	REC-2026-000013	2026-02-04 08:45:40.073517	Bryan Alexander	DNI	52146378	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE3234	2026-01-11	4	6	Este es un texto de prueba	745.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	2
12	REC-2026-000012	2026-02-04 08:43:26.966424	Bryan Alexander	DNI	52146378	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE3234	2026-01-11	4	6	Este es un texto de prueba	745.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	2
11	REC-2026-000011	2026-02-04 08:39:13.474543	Bryan Alexander	DNI	52146378	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE3234	2026-01-11	4	6	Este es un texto de prueba	745.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	2
10	REC-2026-000010	2026-02-03 17:24:26.953177	johffyhho	DNI	87654322	johffyhho@gsfy.com	999999999	JOHFFYHHO	2026-01-27	2	1	johffyhhoi{ññññññññññ	789.00	t	johffyhho	\N	pendiente	\N	\N	\N	\N	2
5	REC-2026-000005	2026-02-02 17:45:08.313338	Bryan	DNI	87654321	bryan@dominio.com	987654321	QWERQWE3234	2026-02-01	1	1	este es un textooooooo	5000.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	2
4	REC-2026-000004	2026-02-02 17:04:14.465466	Alexander Santos	DNI	73263749	bryan@dominio.com	987654321	KL-232-GFTHER	2026-01-13	2	1	alshgerogjwoeijoeijwoihoewirgwo	5000.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	2
25	REC-2026-000025	2026-02-09 08:46:15.142516	Bryan Santos	Pasaporte	879465168651	bryan@karsil.com	987654321	QWERQWE3234	2026-02-05	2	9	jfkuflufgliugylljnol	21.00	t	Bryan	1	pendiente	1	1	\N	\N	3
24	REC-2026-000024	2026-02-09 08:44:44.111357	Bryan Santos	Pasaporte	879465168651	bryan@karsil.com	987654321	QWERQWE3234	2026-02-05	2	9	jfkuflufgliugylljnol	21.00	t	Bryan	\N	pendiente	1	1	\N	1	3
23	REC-2026-000023	2026-02-09 08:41:07.202052	Bryan Santos	Pasaporte	879465168651	bryan@karsil.com	987654321	QWERQWE3234	2026-02-05	2	9	jfkuflufgliugylljnol	21.00	t	Bryan	\N	pendiente	1	1	\N	1	3
22	REC-2026-000022	2026-02-09 08:40:12.142597	Bryan Santos	Pasaporte	879465168651	bryan@karsil.com	987654321	QWERQWE3234	2026-02-05	2	9	jfkuflufgliugylljnol	21.00	t	Bryan	\N	pendiente	1	1	\N	1	3
16	REC-2026-000016	2026-02-04 09:57:32.271742	Andhy	DNI	85214763	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE3234	2026-01-27	4	6	elrhgwñorigoeñrwqhthwrth	588.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	3
9	REC-2026-000009	2026-02-03 16:49:56.818466	Bryan Alexander	DNI	87654321	xbandiiidoxbandiiido@gmail.com	987412563	EFHES4WW5	2026-01-16	2	5	Este es un mensaje xddd	369.00	t	Bryan 	\N	pendiente	\N	\N	\N	\N	3
18	REC-2026-000018	2026-02-05 09:10:28.38262	Karsil	DNI	87654321	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE3234	2026-01-27	2	1	lñahrgoñwhgñoqhrñgoqerg	23.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	4
17	REC-2026-000017	2026-02-05 09:05:08.366186	Karsil	DNI	87654321	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE3234	2026-01-27	2	1	lñahrgoñwhgñoqhrñgoqerg	23.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	4
6	REC-2026-000006	2026-02-03 09:29:10.36884	Bryan	DNI	87654321	bryan@dominio.com	987654321	QWERQWE3234	2026-01-27	2	1	este es un mensajeeee	5.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	5
27	REC-2026-000027	2026-02-09 09:32:33.761559	Bryan Santos	DNI	87654321	bryan@dominio.com	987654321	QWERQWE3234	2026-02-04	1	15	dggrhrthrthrhrthrtetet	78.00	t	Bryan	1	pendiente	1	1	\N	\N	6
20	REC-2026-000020	2026-02-09 08:27:40.051962	Prueba Lunes	DNI	87654321	bryan@karsil.com	987654321	QWERQWE3234	2026-01-25	2	1	Este es un mensaje, Este es un mensaje	84.99	t	Bryan	\N	pendiente	1	1	\N	1	6
8	REC-2026-000008	2026-02-03 16:25:23.963975	Bryan Santos	DNI	85236417	xbandiiidoxbandiiido@gmail.com	987456321	QWERQWE3234	2026-01-25	3	1	Est es un texto de Prueba	562.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	6
3	REC-2026-000003	2026-02-02 15:41:48.363468	Bryan 	DNI	32165478	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE32342	2026-02-01	1	2	elkrgjwoeñrhgwoerigjwoerijgoewr	\N	t	Bryaan	\N	pendiente	\N	\N	\N	\N	6
26	REC-2026-000026	2026-02-09 08:47:39.467483	Bryan Santos	Pasaporte	634645257	bryan@dominio.com	987654321	QWERQWE3234	2026-02-05	3	1	thrthrrwtywtrywytywtywy	8.00	t	Bryan	\N	pendiente	1	1	\N	\N	7
19	REC-2026-000019	2026-02-07 11:52:32.890677	Prueba Prueba	DNI	87654321	prueba@dominio.com	987654321	QWERQWE3234	2026-02-02	2	3	sadgoergoerin wij groejgerogj eori gjoe	87.01	t	Bryan	\N	pendiente	1	1	\N	\N	7
15	REC-2026-000015	2026-02-04 08:55:46.462529	Bryan Alexander Santos Buhezo	DNI	12345678	xbandiiidoxbandiiido@gmail.com	987654321	QWERQWE3234	2026-01-13	3	1	Este ese un texto de pruebaa\r\n	325.00	t	Bryan	\N	pendiente	\N	\N	\N	\N	7
28	REC-2026-000028	2026-02-09 10:06:29.931138	Bryan Santos	DNI	23423344	bryan@karsil.com	987654321	QWERQWE3234	2026-02-04	2	15	ertjeyjeyetyjgffhhhhh	747.00	t	Bryan	1	pendiente	1	1	\N	\N	1
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, nombre) FROM stdin;
1	admin
2	operador
3	cliente
\.


--
-- Data for Name: roles_permisos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles_permisos (rol_id, permiso_id) FROM stdin;
1	1
1	2
1	3
1	4
\.


--
-- Data for Name: tarifarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tarifarios (id, ciudad_id, modalidad_id, tipo_envio_id, primer_kg, kg_adicional, base_hasta_20kg, activo) FROM stdin;
\.


--
-- Data for Name: tipos_envio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos_envio (id, nombre, value, icon) FROM stdin;
1	Perecible	perecible	/public/icons/icon_manzana.png
2	Valorizado	valorizado	/public/icons/icon_valorizado.png
3	General	general	/public/icons/icon_caja.png
4	Refrigerado	refrigerado	/public/icons/icon_refrigerado.png
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password_hash, activo, created_at) FROM stdin;
1	Bryan Santos	bryan@karsil.com	$2b$10$tyeKzHr.I4e7XhZZBZV6rOw.PjOKj6duBgEn0VAbYZLg00cr.jvUO	t	2026-02-05 09:53:57.322928
2	Bryan Santos	bryan@dominio.com	$2b$10$Uhue7R9psClJKY3evAuef.VEuaeZbxN8Ogp.igQ1QgvmFYqnsPnf6	t	2026-02-06 10:56:23.339244
\.


--
-- Data for Name: usuarios_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios_roles (usuario_id, rol_id) FROM stdin;
1	1
2	3
\.


--
-- Name: ciudades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ciudades_id_seq', 15, true);


--
-- Name: cotizaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cotizaciones_id_seq', 1, false);


--
-- Name: departamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departamentos_id_seq', 15, true);


--
-- Name: estados_reclamo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estados_reclamo_id_seq', 4, true);


--
-- Name: evidencias_reclamo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evidencias_reclamo_id_seq', 31, true);


--
-- Name: fechas_recojo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fechas_recojo_id_seq', 14, true);


--
-- Name: historial_reclamo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historial_reclamo_id_seq', 1, false);


--
-- Name: modalidad_envio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modalidad_envio_id_seq', 2, true);


--
-- Name: motivos_reclamo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.motivos_reclamo_id_seq', 8, true);


--
-- Name: permisos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permisos_id_seq', 4, true);


--
-- Name: prioridades_reclamo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prioridades_reclamo_id_seq', 4, true);


--
-- Name: reclamos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reclamos_id_seq', 28, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 4, true);


--
-- Name: tarifarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tarifarios_id_seq', 1, false);


--
-- Name: tipos_envio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_envio_id_seq', 4, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);


--
-- Name: ciudades ciudades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudades
    ADD CONSTRAINT ciudades_pkey PRIMARY KEY (id);


--
-- Name: cotizaciones cotizaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cotizaciones
    ADD CONSTRAINT cotizaciones_pkey PRIMARY KEY (id);


--
-- Name: departamentos departamentos_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT departamentos_nombre_key UNIQUE (nombre);


--
-- Name: departamentos departamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT departamentos_pkey PRIMARY KEY (id);


--
-- Name: estados_reclamo estados_reclamo_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_reclamo
    ADD CONSTRAINT estados_reclamo_codigo_key UNIQUE (codigo);


--
-- Name: estados_reclamo estados_reclamo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_reclamo
    ADD CONSTRAINT estados_reclamo_pkey PRIMARY KEY (id);


--
-- Name: evidencias_reclamo evidencias_reclamo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidencias_reclamo
    ADD CONSTRAINT evidencias_reclamo_pkey PRIMARY KEY (id);


--
-- Name: fechas_recojo fechas_recojo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fechas_recojo
    ADD CONSTRAINT fechas_recojo_pkey PRIMARY KEY (id);


--
-- Name: historial_reclamo historial_reclamo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_reclamo
    ADD CONSTRAINT historial_reclamo_pkey PRIMARY KEY (id);


--
-- Name: modalidad_envio modalidad_envio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modalidad_envio
    ADD CONSTRAINT modalidad_envio_pkey PRIMARY KEY (id);


--
-- Name: modalidad_envio modalidad_envio_value_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modalidad_envio
    ADD CONSTRAINT modalidad_envio_value_key UNIQUE (value);


--
-- Name: motivos_reclamo motivos_reclamo_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motivos_reclamo
    ADD CONSTRAINT motivos_reclamo_codigo_key UNIQUE (codigo);


--
-- Name: motivos_reclamo motivos_reclamo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motivos_reclamo
    ADD CONSTRAINT motivos_reclamo_pkey PRIMARY KEY (id);


--
-- Name: permisos permisos_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT permisos_codigo_key UNIQUE (codigo);


--
-- Name: permisos permisos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT permisos_pkey PRIMARY KEY (id);


--
-- Name: prioridades_reclamo prioridades_reclamo_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prioridades_reclamo
    ADD CONSTRAINT prioridades_reclamo_codigo_key UNIQUE (codigo);


--
-- Name: prioridades_reclamo prioridades_reclamo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prioridades_reclamo
    ADD CONSTRAINT prioridades_reclamo_pkey PRIMARY KEY (id);


--
-- Name: reclamos reclamos_numero_reclamo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamos
    ADD CONSTRAINT reclamos_numero_reclamo_key UNIQUE (numero_reclamo);


--
-- Name: reclamos reclamos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamos
    ADD CONSTRAINT reclamos_pkey PRIMARY KEY (id);


--
-- Name: roles roles_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_nombre_key UNIQUE (nombre);


--
-- Name: roles_permisos roles_permisos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_permisos
    ADD CONSTRAINT roles_permisos_pkey PRIMARY KEY (rol_id, permiso_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: tarifarios tarifarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarifarios
    ADD CONSTRAINT tarifarios_pkey PRIMARY KEY (id);


--
-- Name: tipos_envio tipos_envio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_envio
    ADD CONSTRAINT tipos_envio_pkey PRIMARY KEY (id);


--
-- Name: tipos_envio tipos_envio_value_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_envio
    ADD CONSTRAINT tipos_envio_value_key UNIQUE (value);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: usuarios_roles usuarios_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_roles
    ADD CONSTRAINT usuarios_roles_pkey PRIMARY KEY (usuario_id, rol_id);


--
-- Name: ciudades ciudades_departamento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudades
    ADD CONSTRAINT ciudades_departamento_id_fkey FOREIGN KEY (departamento_id) REFERENCES public.departamentos(id);


--
-- Name: cotizaciones cotizaciones_destino_ciudad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cotizaciones
    ADD CONSTRAINT cotizaciones_destino_ciudad_id_fkey FOREIGN KEY (destino_ciudad_id) REFERENCES public.ciudades(id);


--
-- Name: cotizaciones cotizaciones_origen_ciudad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cotizaciones
    ADD CONSTRAINT cotizaciones_origen_ciudad_id_fkey FOREIGN KEY (origen_ciudad_id) REFERENCES public.ciudades(id);


--
-- Name: evidencias_reclamo evidencias_reclamo_reclamo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidencias_reclamo
    ADD CONSTRAINT evidencias_reclamo_reclamo_id_fkey FOREIGN KEY (reclamo_id) REFERENCES public.reclamos(id) ON DELETE CASCADE;


--
-- Name: reclamos fk_reclamos_motivo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamos
    ADD CONSTRAINT fk_reclamos_motivo FOREIGN KEY (motivo_reclamo) REFERENCES public.motivos_reclamo(id);


--
-- Name: historial_reclamo historial_reclamo_creado_por_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_reclamo
    ADD CONSTRAINT historial_reclamo_creado_por_fkey FOREIGN KEY (creado_por) REFERENCES public.usuarios(id);


--
-- Name: historial_reclamo historial_reclamo_estado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_reclamo
    ADD CONSTRAINT historial_reclamo_estado_id_fkey FOREIGN KEY (estado_id) REFERENCES public.estados_reclamo(id);


--
-- Name: historial_reclamo historial_reclamo_reclamo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_reclamo
    ADD CONSTRAINT historial_reclamo_reclamo_id_fkey FOREIGN KEY (reclamo_id) REFERENCES public.reclamos(id);


--
-- Name: reclamos reclamos_asignado_a_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamos
    ADD CONSTRAINT reclamos_asignado_a_fkey FOREIGN KEY (asignado_a) REFERENCES public.usuarios(id);


--
-- Name: reclamos reclamos_creado_por_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamos
    ADD CONSTRAINT reclamos_creado_por_fkey FOREIGN KEY (creado_por) REFERENCES public.usuarios(id);


--
-- Name: reclamos reclamos_estado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamos
    ADD CONSTRAINT reclamos_estado_id_fkey FOREIGN KEY (estado_id) REFERENCES public.estados_reclamo(id);


--
-- Name: reclamos reclamos_oficina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamos
    ADD CONSTRAINT reclamos_oficina_id_fkey FOREIGN KEY (oficina_id) REFERENCES public.ciudades(id);


--
-- Name: reclamos reclamos_prioridad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamos
    ADD CONSTRAINT reclamos_prioridad_id_fkey FOREIGN KEY (prioridad_id) REFERENCES public.prioridades_reclamo(id);


--
-- Name: reclamos reclamos_tipo_servicio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamos
    ADD CONSTRAINT reclamos_tipo_servicio_id_fkey FOREIGN KEY (tipo_servicio_id) REFERENCES public.tipos_envio(id);


--
-- Name: roles_permisos roles_permisos_permiso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_permisos
    ADD CONSTRAINT roles_permisos_permiso_id_fkey FOREIGN KEY (permiso_id) REFERENCES public.permisos(id) ON DELETE CASCADE;


--
-- Name: roles_permisos roles_permisos_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_permisos
    ADD CONSTRAINT roles_permisos_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: tarifarios tarifarios_ciudad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarifarios
    ADD CONSTRAINT tarifarios_ciudad_id_fkey FOREIGN KEY (ciudad_id) REFERENCES public.ciudades(id);


--
-- Name: usuarios_roles usuarios_roles_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_roles
    ADD CONSTRAINT usuarios_roles_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: usuarios_roles usuarios_roles_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_roles
    ADD CONSTRAINT usuarios_roles_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 5KzWOkzXq4NZjn2gr2cLZfE5tAPwxZqmLXgBXRYbiNHOUImotUkwhdCZeQbEZfQ

